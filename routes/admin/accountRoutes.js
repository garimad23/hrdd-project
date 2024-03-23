/**
 * Module Dependencies
 */
const router = global.express.Router();
const {
  updateProfile,
  getProfile,
  changePassword,
  logout,
  dashboardData,
 
} = require("../../controllers/admin/accountController");

const { validateRequest } = require("../../middleware/validators");
const { profileSchema, passwordSchema } = require("../../validators/admin/accountValidator");

const PATH = "/v1";

//#region --profile

// update profile super admin api
router
  .route(`${PATH}/profile`)
  .post(profileSchema, validateRequest, updateProfile);

// change password super admin api
router
.route(`${PATH}/change-password`)
.post(passwordSchema, validateRequest, changePassword);

// get profile super admin api
router.route(`${PATH}/profile`).get(getProfile);

router.route(`${PATH}/logout`).get(logout);

router.route(`${PATH}/dashboard`).get(dashboardData);



//#endregion

module.exports = router;
