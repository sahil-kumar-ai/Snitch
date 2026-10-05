import { body } from 'express-validator';

const cartValidator = [
    body("product")
        .exists().withMessage("Please add an product").bail()
        .isString().withMessage("Product must be in string format").bail()
        .isMongoId().withMessage("Product ID must be an valid MongoID"),
    body("items")
        .exists().withMessage("Please enter how many items do u need").bail()
        .isInt({ min : 1 }).withMessage("Items must be an valid interger and minimum no of items can 1").bail(),
    body("size")
        .exists().withMessage("Please enter an size").bail()
        .isString().withMessage("Size must be a string")
        .isIn([ "XS", "S", "M", "L", "XL", "XXL" ]).withMessage("Sizes can be only in XS, S, M, L, XL, XXL"),
]

export default cartValidator;