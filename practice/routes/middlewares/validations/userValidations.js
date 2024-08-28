const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.validSignUp = [
  check("username")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.USER_NAME_REQUIRED)
    .isString()
    .withMessage(ERRORS.REQUIRED.USERNAME_MUST_STRING),
  check("email")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERRORS.REQUIRED.VALID_EMAIL),
  check("password")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.PASSWORD_REQUIRED)
    .isString()
    .withMessage(ERRORS.REQUIRED.PASSWORD_MUST_STRING),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: errorMessages[0] });
    }
    next();
  },
];

exports.validLogin = [
  check("email")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.EMAIL_REQUIRED)
    .isEmail()
    .withMessage(ERRORS.REQUIRED.VALID_EMAIL),
  check("password")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.PASSWORD_REQUIRED)
    .isString()
    .withMessage(ERRORS.REQUIRED.PASSWORD_MUST_STRING),
  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);

    if (!errors.isEmpty()) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: errorMessages[0] });
    }
    next();
  },
];

exports.userIdValidation = [
  check("id")
      .notEmpty()
      .withMessage(ERRORS.REQUIRED.USER_ID)
      .isMongoId()
      .withMessage(ERRORS.INVALID.INVALID_USER_ID),
  check("departmentId")
      .optional()
      .isMongoId()
      .withMessage(ERRORS.INVALID.INVALID_DEPARTMENT_ID),
  (req, res, next) => {
      const errors = validationResult(req);
      const errorMessages = errors.array().map((error) => error.msg);
      if (!errors.isEmpty()) {
          return res
              .status(STATUS_CODE.BAD_REQUEST)
              .json({ success: false, message: errorMessages[0] });
      }
      next();
  },
];