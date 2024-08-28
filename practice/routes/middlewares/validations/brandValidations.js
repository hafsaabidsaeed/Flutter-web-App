const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.brandValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.BRAND_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_BRAND_ID),
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