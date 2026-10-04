import { Router } from "express";import productValidator from "../validator/product.validator.js";
import { validationMiddleware } from "../middleware/validator.middleware.js";
;

const router = Router();

router.post('/create', productValidator, validationMiddleware)

export default router;
