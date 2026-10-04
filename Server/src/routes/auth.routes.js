import { Router } from "express";
import { findUser, loginUserController, refresh, registerUserController } from "../controller/auth.controller.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { validationMiddleware } from "../middleware/validator.middleware.js";
import { validateUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, validationMiddleware, registerUserController);
router.post('/login', loginValidator, validationMiddleware, loginUserController);
router.post('/refresh', refresh);
router.get("/me", validateUser, findUser)

export default router;
