const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.sendTaskMessageValidation = [
    check("taskId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.TASK_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_TASK_ID),
    check("senderId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.SENDER_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_SENDER_ID),
    check("receiverId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.RECEIVER_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_RECEIVER_ID),
    // check("message")
    //     .notEmpty()
    //     .withMessage(ERRORS.REQUIRED.MESSAGE)
    //     .isString()
    //     .withMessage(ERRORS.REQUIRED.MESSAGE_MUST_STRING),
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

exports.getTaskMessagesValidation = [
    check("taskId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.TASK_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_TASK_ID),
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