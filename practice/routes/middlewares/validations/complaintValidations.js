const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createComplaintValidation = [
    check("title")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.TITLE)
        .isString()
        .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("description")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION)
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("category")
        .optional()
        .isIn(['General', 'Technical', 'Billing', 'Service', 'Other'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_CATEGORY),
    check("status")
        .optional()
        .isIn(['Pending', 'In Progress', 'Resolved', 'Closed'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_STATUS),
    check("priority")
        .optional()
        .isIn(['Low', 'Medium', 'High'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_PRIORITY),
    check("files")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.FILES_MUST_ARRAY),
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

exports.updateComplaintValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.COMPLAINT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_COMPLAINT_ID),
    check("title")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("description")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("category")
        .optional()
        .isIn(['General', 'Technical', 'Billing', 'Service', 'Other'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_CATEGORY),
    check("status")
        .optional()
        .isIn(['Pending', 'In Progress', 'Resolved', 'Closed'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_STATUS),
    check("priority")
        .optional()
        .isIn(['Low', 'Medium', 'High'])
        .withMessage(ERRORS.REQUIRED.VALID_COMPLAINT_PRIORITY),
    check("files")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.FILES_MUST_ARRAY),
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

exports.getComplaintValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.COMPLAINT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_COMPLAINT_ID),
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