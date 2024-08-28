const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.createPortfolioValidation = [
    // check("userId")
    //     .notEmpty()
    //     .withMessage(ERRORS.REQUIRED.USER_ID)
    //     .isMongoId()
    //     .withMessage(ERRORS.INVALID.INVALID_USER_ID),
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
    check("departmentId")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.DEPARTMENT_ID)
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_DEPARTMENT_ID),
    check("tags")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.TAGS)
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.TAGS_MUST_ARRAY),
    // .isString()
    // .withMessage('Each tag must be a string'),
    check("isFeatured")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.IS_FEATURED)
        .isBoolean()
        .withMessage(ERRORS.REQUIRED.IS_FEATURED_MUST_BOOLEAN),
    check("featuredImage")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.FEATURED_IMAGE)
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.FEATURED_IMAGE_MUST_ARRAY),
    check("galleryImages")
        .notEmpty()
        .withMessage(ERRORS.REQUIRED.GALLERY_IMAGES)
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.GALLERY_IMAGES_MUST_ARRAY),
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

exports.updatePortfolioValidation = [
    check("id")
      .notEmpty()
      .withMessage(ERRORS.REQUIRED.PORTFOLIO_ID)
      .isMongoId()
      .withMessage(ERRORS.INVALID.INVALID_PORTFOLIO_ID),
    check("title")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.TITLE_MUST_STRING),
    check("description")
        .optional()
        .isString()
        .withMessage(ERRORS.REQUIRED.DESCRIPTION_MUST_STRING),
    check("departmentId")
        .optional()
        .isMongoId()
        .withMessage(ERRORS.INVALID.INVALID_DEPARTMENT_ID),
    check("tags")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.TAGS_MUST_ARRAY),
    check("isFeatured")
        .optional()
        .isBoolean()
        .withMessage(ERRORS.REQUIRED.IS_FEATURED_MUST_BOOLEAN),
    check("featuredImage")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.FEATURED_IMAGE_MUST_ARRAY),
    check("galleryImages")
        .optional()
        .isArray({ min: 1 })
        .withMessage(ERRORS.REQUIRED.GALLERY_IMAGES_MUST_ARRAY),
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

exports.getPortfoliosValidation = [
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

exports.deletePortfolioValidation = [
    check("id")
      .notEmpty()
      .withMessage(ERRORS.REQUIRED.PORTFOLIO_ID)
      .isMongoId()
      .withMessage(ERRORS.INVALID.INVALID_PORTFOLIO_ID),
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