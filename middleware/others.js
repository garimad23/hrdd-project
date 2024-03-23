const { AuthError } = require("../libs/errorLib");

exports.prodRouteNotAvailable = (modes = ["prod"]) => {
  /**
   * #swagger.ignore = true
   */
  return (req, res, next) => {
    if (modes?.includes(process?.env?.MODE)) {
      throw new AuthError(`Endpoint not available for production environment`);
    }
    next();
  };
};
