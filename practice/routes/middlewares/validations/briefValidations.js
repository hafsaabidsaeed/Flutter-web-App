const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createBriefValidation = [
    // check("title")
    //     .notEmpty()
    //     .withMessage(ERRORS.REQUIRED.TITLE)
    //     .isString()
    //     .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("title")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.SERVICE_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_SERVICE_ID),
    check("description")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION)
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("createdBy")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CREATED_BY)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CREATED_BY),
    check("clientProjectId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CLIENT_PROJECT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CLIENT_PROJECT_ID),
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

exports.updateBriefValidation = [
    check("briefId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.BRIEF_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_BRIEF_ID),
    // check("userId")
    //     .notEmpty()
    //     .withMessage(ERRORS.REQUIRED.USER_ID)
    //     .isMongoId()
    //     .withMessage(ERRORS.INVALID.INVALID_USER_ID),
    check("action")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.ACTION)
        .isIn(['update-status', 'update-data']) //'add-user', 'remove-user',
        .withMessage(ERRORS.REQUIRED.VALID_ACTION),
    check("status")
        .optional()
        .isIn(['pending', 'in-progress', 'rejected', 'completed', 'delayed', 'meeting', 'reopen'])
        .withMessage(ERRORS.REQUIRED.VALID_STATUS),
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

exports.listByClientProjectValidation = [
    check("clientProjectId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CLIENT_PROJECT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CLIENT_PROJECT_ID),
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

exports.singleBriefValidation = [
    check("clientProjectId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CLIENT_PROJECT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CLIENT_PROJECT_ID),
    check("briefId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.BRIEF_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_BRIEF_ID),
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

exports.deliverBriefValidation = [
    check("briefId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.BRIEF_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_BRIEF_ID),
    check("link")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.BRIEF_LINK)
        .isURL()
        .withMessage(ERRORS.INVALID.INVALID_URL),
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