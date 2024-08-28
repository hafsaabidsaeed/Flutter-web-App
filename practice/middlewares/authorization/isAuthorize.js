const jwt = require("jsonwebtoken");
//const { STATUS_CODE, ERRORS } = require("../../constants");

const isAuthorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.UN_AUTHORIZE });
    }
    
const bearerHeader = req.headers['authorization']
const bearer = bearerHeader.split(' ');
const token = bearer[1];


    if (!token || token === "null") {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.UN_AUTHORIZE });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check user's role
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(STATUS_CODE.FORBIDDEN)
          .json({ success: false, message: ERRORS.ERRORS.FORBIDDEN });
      }
      next();
    } catch (error) {
      return res.status(STATUS_CODE.UN_AUTHORIZED).json({
        success: false,
        message: ERRORS.ERRORS.UN_AUTHORIZE,
        error: error.message,
      });
    }
  };
};

module.exports = isAuthorize;
