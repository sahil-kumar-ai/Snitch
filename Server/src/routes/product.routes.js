import { Router } from "express";
import { validationMiddleware } from "../middleware/validator.middleware.js";
import { validateUser } from "../middleware/auth.middleware.js";
import { authorizeUser } from "../middleware/authorization.middleware.js";
import { listProductValidator, productValidator, unlistProductValidator } from "../validator/product.validator.js";
import uploads from "../config/multer.js";
import { createProduct, listAllProductController, listAllProductToSellerController, listProduct, unlistProduct } from "../controller/product.controller.js";
import { parseProductData } from "../utils/product.utils.js";

const router = Router();

router.post('/create', validateUser, authorizeUser, uploads.array("images"), parseProductData, productValidator, validationMiddleware, createProduct);
router.get('/', validateUser, listAllProductController);
router.get('/seller', validateUser, authorizeUser,listAllProductToSellerController);
router.patch('/unlist/:id', validateUser, authorizeUser, unlistProductValidator, validationMiddleware, unlistProduct);
router.patch('/list/:id', validateUser, authorizeUser, listProductValidator, validationMiddleware, listProduct);

export default router;
