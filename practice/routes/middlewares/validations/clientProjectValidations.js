const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createClientProjectValidation = [
    check("userId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.USER_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_USER_ID),
    check("price")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.PRICE)
        .isString()
        .withMessage(ERRORS.REQUIRED.PRICE_MUST_STRING),
    check("currency")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CURRENCY)
        .isString()
        .withMessage(ERRORS.REQUIRED.CURRENCY_MUST_STRING),
    check("packageName")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.PACKAGE_NAME)
        .isString()
        .withMessage(ERRORS.REQUIRED.PACKAGE_NAME_MUST_STRING),
    // check("projectTitle")
    //     .notEmpty()
    //     .withMessage(ERRORS.REQUIRED.PROJECT_TITLE)
    //     .isString()
    //     .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("projectTitle")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.SERVICE_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_SERVICE_ID),
    check("projectDescription")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.PROJECT_DESCRIPTION)
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("projectCategory")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.PROJECT_CATEGORY)
        .isString()
        .withMessage(ERRORS.REQUIRED.PROJECT_CATEGORY_MUST_STRING),
    // .notEmpty()
    // .withMessage(ERRORS.REQUIRED.PROJECT_CATEGORY)
    // .isArray({ min: 1 })
    // .withMessage(ERRORS.REQUIRED.PROJECT_CATEGORY_MUST_ARRAY),
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

exports.updateClientProjectValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.CLIENT_PROJECT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_CLIENT_PROJECT_ID),
    check("leadId")
        .optional()
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_LEAD_ID),
    check("projectTitle")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("projectDescription")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("files")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.FILES_MUST_ARRAY),
    check("action")
        .optional()
        .isIn(['add-lead', 'remove-lead', 'delivered'])
        .withMessage(ERRORS.REQUIRED.VALID_PROJECT_ACTION),
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

exports.getClientProjectValidation = [
    check("id")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.USER_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_USER_ID),
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

exports.getSingleClientProjectValidation = [
    check("id")
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

// exports.getClientProjectsByDepartmentIdValidation = [
//     check("id")
//         .notEmpty()
//         .withMessage(ERRORS.REQUIRED.DEPARTMENT_ID)
//         .isMongoId()
//         .withMessage(ERRORS.INVALID.INVALID_DEPARTMENT_ID),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         const errorMessages = errors.array().map((error) => error.msg);
//         if (!errors.isEmpty()) {
//             return res
//                 .status(STATUS_CODE.BAD_REQUEST)
//                 .json({ success: false, message: errorMessages[0] });
//         }
//         next();
//     },
// ];

exports.getClientProjectsByCategoryIdValidation = [
    check("id")
        .notEmpty()
        .withMessage("Category id is required")
        .isMongoId()
        .withMessage("Invalid category id"),
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