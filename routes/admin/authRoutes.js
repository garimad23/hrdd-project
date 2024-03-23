/**
 * Module Dependencies
 */
const router = global.express.Router();
const {
  login,
  forgotPassword,
  resetPassword,
} = require("../../controllers/admin/authController");
const { validateRequest } = require("../../middleware/validators");
const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../../validators/admin/authValidator");

const PATH = "/v1";

// login api
router.route(`${PATH}/login`).post(loginSchema, validateRequest, login);

// forgot password api
router
  .route(`${PATH}/forgot-password`)
  .post(forgotPasswordSchema, validateRequest, forgotPassword);

// verify password-reste OTP api
router
  .route(`${PATH}/reset-password`)
  .post(resetPasswordSchema, validateRequest, resetPassword);

module.exports = router;
