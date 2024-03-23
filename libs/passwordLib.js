const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { generate } = require("generate-password");
const saltRounds = 10;

// hash plain text
exports.hashPassword = (myPlaintextPassword) => {
  let salt = genSaltSync(saltRounds);
  let hash = hashSync(myPlaintextPassword, salt);
  return hash;
};

// compare plain text and hashed string
exports.comparePasswordSync = ({ plainText = "", hashedText = "" }) => {
  const val = compareSync(plainText, hashedText);
  console.log("===val===", val);
  return val;
};

// generate unique random password
exports.generateRandomPassword = ({
  length = 10,
  numbers = true,
  symbols = false,
  lowercase = true,
  uppercase = true,
  excludeSimilarCharacters = false,
  exclude = "",
  strict = true,
}) => {
  return generate({
    length,
    numbers,
    symbols,
    lowercase,
    uppercase,
    excludeSimilarCharacters,
    exclude,
    strict,
  });
};

exports.checkStrongPassword = ({password}) => {
  let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
  return strongPassword.test(password)
}

exports.checkStrongPasscode = ({password}) => {
  let strongPassword = new RegExp('^[0-9]{6,10}$');
  return strongPassword.test(password)
}
