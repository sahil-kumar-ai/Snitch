import { body, param } from 'express-validator';

export const productValidator = [
    body("title")
        .exists().withMessage("Please enter an title").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min : 2, max : 100 }).withMessage("Title must be in between 2 to 100 charachter").bail()
        .isAlpha("en-US", { ignore : " -" }).withMessage("Tile can contain only english small letter, capital letter and spaces"),
    body("description")
        .exists().withMessage("Please enter an description").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min : 20, max : 500 }).withMessage("Description must be in between 20 to 500 charachter").bail(),
    body("price.amount")
        .exists().withMessage("Please enter an amount").bail()
        .isFloat({ min : 0 }).withMessage("Amont must be in Float and the minimum price must be 0"),
    body("price.currency")
        .exists().withMessage("Please enter an currency")
        .isString().withMessage("Currency must be a string").bail()
        .trim()
        .isIn(["INR", "USD"]).withMessage("Currency ccan only be either INR or USD"),
    body('sizes')
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizes must be an array of abjects"),
    body("sizes.*.size")
        .exists().withMessage("size must be present in every entry of size array").bail()
        .isString().withMessage("Sizres must be in string value").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size can be only one of these XS, S, M, L, XL, XXL."),
    body("sizes.*.stock")
        .exists().withMessage("Stock must be present in every entry of the sizes array").bail()
        .isInt({ min : 0 }).withMessage("Stock must be a integer value"),
];

export const unlistProductValidator = [
    param("id")
        .exists().withMessage("Product id is needed").bail()
        .isMongoId().withMessage("ID must be an a valid Mongo ID")
]

export const listProductValidator = [
    param("id")
        .exists().withMessage("Product id is needed").bail()
        .isMongoId().withMessage("ID must be an a valid Mongo ID")
]