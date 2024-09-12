const { check, validationResult } = require("express-validator");
// const { STATUS_CODE, ERRORS } = require("../../constants");

exports.validSignUp = [
  check("username")
    .notEmpty()
    .withMessage("enter your username")
    .isString()
    .withMessage("entered username is not valid"),
  check("email")
    .notEmpty()
    .withMessage("enter your email")
    .isEmail()
    .withMessage("entered email is not valid"),
  check("password")
    .notEmpty()
    .withMessage("enter your password")
    .isString()
    .withMessage("entered password is not valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      return res
        .status("internal server error")
        .json({ success: false, message: errorMessages[0] });
    }
    next();
  },
];

exports.validLogin = [
  check("email")
    .notEmpty()
    .withMessage()
    .isEmail()
    .withMessage("invalid email"),
  check("password")
    .notEmpty()
    .withMessage("invalid password")
    .isString()
    .withMessage("invalid password "),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);

    if (!errors.isEmpty()) {
      return res
        .status("internal server error")
        .json({ success: false, message: errorMessages[0] });
    }
    next();
  },
];

exports.userIdValidation = [
  check("id")
      .notEmpty()
      .withMessage("user id required")
      .isMongoId()
      .withMessage("invalid user id"),
  check("departmentId")
      .optional()
      .isMongoId()
      .withMessage("invalid departmeny id"),
  (req, res, next) => {
      const errors = validationResult(req);
      const errorMessages = errors.array().map((error) => error.msg);
      if (!errors.isEmpty()) {
          return res
              .status("internal server error")
              .json({ success: false, message: errorMessages[0] });
      }
      next();
  },
];