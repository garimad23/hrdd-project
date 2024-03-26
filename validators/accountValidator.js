const { checkSchema } = require("express-validator");

// update profile validations
exports.profileSchema = checkSchema({
  contactName: {
    optional: true,
    in: ["body"],
    isString: {
      errorMessage: `Contact name should be string`,
    },
    trim: true,
  },
});

// update profile validations
exports.passwordSchema = checkSchema({
  oldPassword: {
    in: ["body"],
    errorMessage: `oldPassword is missing`,
    notEmpty: {
      errorMessage: `oldPassword cannot be empty`,
      bail: true,
    },
   
    trim: true,
  },
  newPassword: {
    in: ["body"],
    errorMessage: `newPassword is missing`,
    notEmpty: {
      errorMessage: `newPassword cannot be empty`,
      bail: true,
    },
   
    trim: true,
  },
  
});

