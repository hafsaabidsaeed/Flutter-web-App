const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createFaqValidation = [
    check("question")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.QUESTION)
        .isString()
        .withMessage(ERRORS.REQUIRED.QUESTION_MUST_STRING),
    check("answer")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.ANSWER)
        .isString()
        .withMessage(ERRORS.REQUIRED.ANSWER_MUST_STRING),
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

exports.updateFaqValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.FAQ_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_FAQ_ID),
    check("question")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.QUESTION_MUST_STRING),
    check("answer")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.ANSWER_MUST_STRING),
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

exports.faqValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.FAQ_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_FAQ_ID),
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