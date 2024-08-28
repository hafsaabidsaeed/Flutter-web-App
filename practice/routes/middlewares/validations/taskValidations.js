const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createTaskValidation = [
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
    check("assignedTo")
        .optional()
        .isArray()
        .withMessage(ERRORS.REQUIRED.ASSIGNED_TO_MUST_ARRAY),
    check("createdBy")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CREATED_BY)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CREATED_BY),
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

exports.updateTaskValidation = [
    check("taskId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.TASK_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_TASK_ID),
    check("userId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.USER_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_USER_ID),
    check("action")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.ACTION)
        .isIn(['update-status', 'add-user', 'remove-user'])
        .withMessage(ERRORS.REQUIRED.VALID_ACTION),
    check("status")
        .optional()
        .isIn(['pending', 'in-progress', 'completed', 'to-do'])
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