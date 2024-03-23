//const { Admin, AuditTrail } = require("../../db");
const { comparePasswordSync, hashPassword, checkStrongPassword } = require("../../libs/passwordLib");
const { ApplicationError, AuthError } = require("../../libs/errorLib");
const { generateAccessToken } = require("../../libs/tokenLib");
const {
  UserTypes,
  AuthTokenExpiry,
} = require("../../config/constants");
const { decryptString , encryptString} = require("../../libs/utilsLib");
const { getMessage } = require("../../services/messageService");
const moment = require("moment");
const { templates } = require("../../services/templates")
const { sendMail } = require("../../services/mailService")
const { now } = require("../../libs/timeLib");
const {
  checkFileType,
  uploadFile,
  getFileLink,
} = require("../../services/uploadService");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// login
exports.login = async ({ reqBody = {}, req = {} }) => {
  try {
    const { email, password } = reqBody;
    //const {PrismaClient } = await import("@prisma/client");
    //const prisma = new PrismaClient();
    /**
     * Check if Admin on email exist or not
     */
    //const adminRec = await Admin.findOne({ email });
    const adminRec = await prisma.admin.findUnique({
      where: {email }
    });
    if (!adminRec) {
      throw new ApplicationError(
        getMessage('WRONG_CREDENTIAL')
      );
    }

    if (!comparePasswordSync({
          plainText: password,
          hashedText: adminRec?.password,
        })
    ) {
      throw new AuthError(getMessage('WRONG_CREDENTIAL'));
    }

    /**
     * Generate Access token
     */
  
    const token = generateAccessToken({
      data: {
        adminId: adminRec?.adminId,
        type: UserTypes?.Admin,
      },
    });
    //req.session.token = token;
    
    const auditPayload = {
      action: `Supreme Admin logged In`,
      entryDate: now(),
      origin: "Supreme Admin"
    }
    await prisma.auditTrail.create({ data: auditPayload });
    const user = {
      email: adminRec?.email, 
      contactName: adminRec?.contactName,
    };
    if(adminRec?.image) {
      user.image = await getFileLink({ fileName: adminRec?.image });
    }
    return { token, user };
  } catch (error) {
    throw error;
  }
};

// forgot password
exports.forgotPassword = async ({ reqBody = {} }) => {
  try {
    const { email } = reqBody;
    /**
     * Check if Admin on email exist or not
     */
    const adminRec = await prisma.admin.findUnique({
      where: { email }
    });
    if (!adminRec) {
      throw new ApplicationError(
        getMessage('FORGOT_PASSWD')
      );
    }
    // generate random token
    const token =  encryptString(
      JSON?.stringify({
        email
      })
    );
    const payload = {
      token,
      tokenExpiration: moment()?.add(AuthTokenExpiry, "minutes")?.toISOString(),
    };
    
    await prisma.admin.update({
      where: { adminId: adminRec?.adminId },
      data: payload,
    });

    // Send password reset email to user
    const data = {
      first_name: adminRec?.contactName,
      last_name: "",
      current_date: moment().format('D/M/YYYY'),
      reset_link:  global.config.adminUrl + '/change-password/' + token  
    }
    console.log("data    ", data);
    sendMail(email, data, templates.RESET_PASSWORD_ADMIN);

    // await sendForgotPasswordAdminMail({
    //   to: email,
    //   data: {
    //     first_name: adminRec?.contactName,
    //     last_name: adminRec?.businessName,
    //     reset_link:token 
    //  }
    // });

    const auditPayload = {
      action: `Supreme Admin forgot password request`,
      entryDate: now(),
      origin: "Supreme Admin"
    }
    await prisma.auditTrail.create({ data: auditPayload });

    return true;
  } catch (error) {
    throw error;
  }
};

exports.passwordReset = async ({ reqBody = {} }) => {
  try {
    const { token = "", password = "" } = reqBody;
     if (!token) {
      throw new ApplicationError(getMessage('USER_TOKEN_NOT_FOUND'));
    }
    let email= '';
    console.log("token",token)
    try {
      let decrypted=  JSON?.parse(decryptString(token))
      email = decrypted?.email
    } catch (error) {
      console.log("adminId error ",error)
      throw new ApplicationError(
        getMessage('EXPIRED_TOKEN')
      );
    }

     /**
     * Check if Admin on email exist or not
     */

    const adminRec = await prisma.admin.findUnique({ 
      where: {email}
    });
    if(!adminRec){
      throw new AuthError(
        getMessage('WRONG_CREDENTIAL')
      );
    }

    if (
      token != adminRec?.token ||
      moment(adminRec?.tokenExpiration)?.isBefore(moment())
    ) {
      throw new AuthError(
        getMessage('USER_TOKEN_NOT_FOUND')
      );
    }
    const returnObj = {
      success: true,
      message: `Allowed to reset password`,
    };

    if (password?.length > 0) {
    /**
     * Check if password is strong or not
     */
    
      if(!checkStrongPassword({password})) {
        throw new ApplicationError(
          getMessage('PASSWORD_VALIDATION')
        );
      }
      
      const payload = {
        password: hashPassword(password),
        token: null,
        tokenExpiration: null,
      }
      await prisma.admin.update({
        where: { adminId: adminRec?.adminId },
        data: payload,
      });
      returnObj.message = getMessage('PASSWORD_CHANGED'); 

      const auditPayload = {
        action: `Supreme Admin password reset`,
        entryDate: now(),
        origin: "Supreme Admin"
      }
      await prisma.auditTrail.create({ data: auditPayload });
    }

    return returnObj;
  } catch (error) {
    throw error;
  }
};