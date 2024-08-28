const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createIncludeValidation = [
    check("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string"),
    check("status")
        .notEmpty()
        .withMessage("Status is required")
        .isBoolean()
        .withMessage("Status must be boolean"),
    check("time")
        .notEmpty()
        .withMessage("Time is required")
        .isString()
        .withMessage("Time must be a string"),
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
