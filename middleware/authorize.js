//const moment = require("moment");
const {
  validateToken,
  decodeToken,
  generateAccessToken,
} = require("../libs/tokenLib");
const { setResHeader, decryptString } = require("../libs/utilsLib");
const { TokenKeys, UserTypes } = require("../config/constants");
const { AuthError } = require("./../libs/errorLib");
const { keys: _keys, values: _values, trim, isEmpty } = require("lodash");
//const { Admin, Client } = require("../db");
const {PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authAccessKeyName = TokenKeys?.AccessToken;
//const ObjectId = require('mongoose').Types.ObjectId; 

exports.decodeAuthToken = async (req, res, next) => {
  try {
    let accessToken = trim(req.headers[authAccessKeyName]);

    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken?.slice(7, accessToken?.length);
    }

    if (accessToken.startsWith("Basic ")) {
      accessToken = accessToken?.slice(6, accessToken?.length);
    }

    if (!isEmpty(accessToken)) {
      const decoded = await decodeToken(accessToken);
      req.decodedToken = JSON.parse(decryptString(decoded?.data));
    } else {
      throw new AuthError("Authentication Token missing");
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.validateAuthToken = async (req, res, next) => {
  try {
    let accessToken = trim(req.headers[authAccessKeyName]);

    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken?.slice(7, accessToken?.length);
    }

    if (accessToken.startsWith("Basic ")) {
      accessToken = accessToken?.slice(6, accessToken?.length);
    }

    if (isEmpty(accessToken)) {
      throw new AuthError("Authentication Token missing");
    } else {
      const decoded = await validateToken(accessToken);
      req.decodedToken = JSON.parse(decryptString(decoded?.data));
      //console.log("decode Token === ", req.decodedToken);
      req.user = undefined;
      {
        if (
          req?.decodedToken?.type == UserTypes?.Admin &&
          req?.decodedToken?.adminId
        ) {
          // run db query to fetch user details and append it with request to use further in the request propagation
          req.user = await prisma.admin.findFirst({
            where: { 
              adminId: req?.decodedToken?.adminId,
              isActive: true
            }
          });
          delete req?.user?.password;
          console.log("req user   ======    ", req?.user);
        } 
        else if (
          req?.decodedToken?.type == UserTypes?.User &&
          req?.decodedToken?.userId
        ) {
          // run db query to fetch user details and append it with request to use further in the request propagation
          req.user = await prisma.user.findFirst({
            where: { 
              userId: req?.decodedToken?.userId,
              isActive: true
            }
          });
          delete req?.user?.passCode;
          console.log("req user   ======    ", req?.user);
        } else if(
          req?.decodedToken?.type == UserTypes?.Support &&
          req?.decodedToken?.supportPersonId
        ) {
          req.user = await prisma.supportPerson.findUnique({
            where: { 
              supportPersonId: req?.decodedToken?.supportPersonId
            }
          });
          delete req?.user?.password;
          console.log("req user   ======    ", req?.user);
        }
        if (!req.user) {
          throw new AuthError("Authenticated User not found");
        }
      }

      if (decoded && _keys(decoded).length > 0) {
        const newAccessToken = generateAccessToken({
          data: req?.decodedToken,
          audience: decoded?.aud,
          issuer: decoded?.iss,
          subject: decoded?.sub,
        });
        setResHeader(res, authAccessKeyName, newAccessToken);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.authenticateUserType = (types) => {
  //console.log("types===", types);
  
  return (req, res, next) => {
    //console.log("decode==== ", req?.decodedToken);
    //console.log("user types =====   ", _values(UserTypes));
    //console.log("value token    ", _values(UserTypes).includes(req?.decodedToken?.type));
    let err;
  
    if (
      req.decodedToken &&
      _values(UserTypes).includes(req?.decodedToken?.type)
    ) {
      if (types?.includes(req?.decodedToken?.type)) {
        next();
      } else {
        err = new AuthError("Not authorized to access");
        next(err);
      }
    } else {
      err = new AuthError("Malformed token found");
      next(err);
    }
  };
};

exports.isAuthSession = async (req, res, next) => {
  try {
    if(isEmpty(req?.session?.token)) {
      throw new AuthError("Authenticated User not found");
    }

    let accessToken = trim(req.headers[authAccessKeyName]);

    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken?.slice(7, accessToken?.length);
    }

    if (accessToken.startsWith("Basic ")) {
      accessToken = accessToken?.slice(6, accessToken?.length);
    }

    if (isEmpty(accessToken)) {
      throw new AuthError("Authentication Token missing");
    }
    let decoded = await validateToken(accessToken);
    const decodedJWTToken = JSON.parse(decryptString(decoded?.data));
    decoded = await validateToken(req?.session?.token);
    const decodedSessionToken = JSON.parse(decryptString(decoded?.data));
    
    let isValidtoken;
    if(decodedSessionToken?.type == UserTypes?.Admin) {
      console.log(`access Token :;;    ${decodedJWTToken?.adminId} \nsession token     :::    ${decodedSessionToken?.adminId}`);
      isValidtoken = decodedSessionToken?.adminId == decodedJWTToken?.adminId;
    } else if(decodedSessionToken?.type == UserTypes?.Client) {
      console.log(`access Token :;;    ${decodedJWTToken?.clientId} \nsession token     :::    ${decodedSessionToken?.clientId}`);
      isValidtoken = decodedSessionToken?.clientId == decodedJWTToken?.clientId;
    }
    if(!isValidtoken) {
      throw new AuthError("Authenticated User not found");
    }

    next();
  } catch (error) {
    next(error);
  }
}


