const jwt = require("jsonwebtoken");
// const { STATUS_CODE, ERRORS } = require("../../constants");

const verifyToken = (req, res, next) => {
  try {

    //check if the authorization error exists 
    if (!req.headers.authorization) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    }//extracting token from authorization error
    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    console.log('token: ',token);

    //check if the token exists or if it is null 
    if (!token || token === "null") {
      return res
        .status(500)
        .json({ success: false, message: "user not found" });
    }
    //verify the token using he secret key
    let payload = jwt.verify(token, process.env.JWT_SECRET);

    //if the token is not valid return 404 status
    if (!payload) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = verifyToken;
