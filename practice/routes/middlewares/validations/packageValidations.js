const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createPackageValidation = [
    check("name")
        .notEmpty()
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string"),
    check("type")
        .notEmpty()
        .withMessage("Type is required")
        .isIn(['Essential', 'Premium'])
        .withMessage("Valid type values are Essential or Premium"),
    check("services")
        .notEmpty()
        .withMessage("Service is required")
        .isArray({ min: 1 })
        .withMessage("Service is required"),
    // check("stripe")
    //     .optional()
    //     .isURL()
    //     .withMessage("Please enter a valid URL"),
    check("status")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.STATUS)
        .isBoolean()
        .withMessage("Status must be true or false"),
    check("price")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.PRICE),
    check("country")
        .notEmpty()
        .withMessage("Country is required")
        .isMongoId()
        .withMessage("Country id is invalid"),
    check("category")
        .notEmpty()
        .withMessage("Category is required")
        .isMongoId()
        .withMessage("Category id is invalid"),
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