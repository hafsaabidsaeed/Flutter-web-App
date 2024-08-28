const jwt = require("jsonwebtoken");
const { STATUS_CODE, ERRORS } = require("../../constants");

const verifyToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.UN_AUTHORIZE });
    }

    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    //console.log('token: ',token);

    if (!token || token === "null") {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.UN_AUTHORIZE });
    }
    let payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res
        .status(STATUS_CODE.UN_AUTHORIZED)
        .json({ success: false, message: ERRORS.ERRORS.UN_AUTHORIZE });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(STATUS_CODE.UN_AUTHORIZED).json({
      success: false,
      message: ERRORS.ERRORS.UN_AUTHORIZE,
      error: error.message,
    });
  }
};

module.exports = verifyToken;
