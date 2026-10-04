import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Please enter an email address")
    .bail() // bail() don't run the next validator if this one fails and it moves on next validation input!
    .trim()
    .isEmail()
    .withMessage("Please enter an valid email address"),
  body("name")
    .exists()
    .withMessage("Please enter a name")
    .bail()
    .isString()
    .withMessage("Please enter name as STRING")
    .bail()
    .trim()
    .isLength({ min: 6, max: 50 })
    .withMessage("Name length must be in between 2 to 50 char long"),
  body("password")
    .exists()
    .withMessage("Please enter an password")
    .bail()
    .isString()
    .withMessage("Please enter a valid PASSWORD")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 char long"),
];

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Please enter an email address")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Please enter an valid email address"),
  body("password")
    .exists()
    .withMessage("Please enter an password")
    .bail()
    .isString()
    .withMessage("Please enter a valid PASSWORD")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 char long"),
];
