const { checkSchema } = require("express-validator");

// login validations
exports.loginSchema = checkSchema({
  email: {
    in: ["body"],
    errorMessage: `Email is missing`,
    notEmpty: {
      errorMessage: `Email cannot be empty`,
      bail: true,
    },
    isEmail: {
      errorMessage: `Email provided is not valid`,
      bail: true,
    },
    normalizeEmail: {
      options: {
        all_lowercase: true,
      },
    },
    trim: true,
  },
  password: {
    in: ["body"],
    errorMessage: `Password is missing`,
    notEmpty: {
      errorMessage: `Password cannot be empty`,
      bail: true,
    },

    trim: true,
  },
});

// forgot password validations
exports.forgotPasswordSchema = checkSchema({
  email: {
    in: ["body"],
    errorMessage: `Email is missing`,
    notEmpty: {
      errorMessage: `Email cannot be empty`,
      bail: true,
    },
    isEmail: {
      errorMessage: `Email provided is not valid`,
      bail: true,
    },
    normalizeEmail: {
      options: {
        all_lowercase: true,
      },
    },
    trim: true,
  },
});

// password reset validations
exports.resetPasswordSchema = checkSchema({
  token: {
    in: ["body"],
    errorMessage: `token is missing`,
    notEmpty: {
      errorMessage: `token cannot be empty`,
      bail: true,
    },
    trim: true,
  },
  password: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      // Multiple options would be expressed as an array
      options: { min: 8 },
    },
  },
});
