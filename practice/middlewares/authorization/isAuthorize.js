const jwt = require("jsonwebtoken");
//const { STATUS_CODE, ERRORS } = require("../../constants");

const isAuthorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    
const bearerHeader = req.headers['authorization']
const bearer = bearerHeader.split(' ');
const token = bearer[1];


    if (!token || token === "null") {
      return res
        .status(404)
        .json({ success: false, message: "User not found"});
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check user's role
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
};

module.exports = isAuthorize;
