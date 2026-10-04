import { Router } from "express";
import { validationMiddleware } from "../middleware/validator.middleware.js";
import { validateUser } from "../middleware/auth.middleware.js";
import { authorizeUser } from "../middleware/authorization.middleware.js";
import productValidator from "../validator/product.validator.js";
import uploads from "../config/multer.js";
import { createProduct } from "../controller/product.controller.js";
import { parseProductData } from "../utils/product.utils.js";

const router = Router();

router.post('/create', validateUser, authorizeUser, uploads.array("images"), parseProductData, productValidator, validationMiddleware, createProduct)

export default router;
