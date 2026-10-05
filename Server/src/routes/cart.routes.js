import  { Router } from 'express';
import cartValidator from '../validator/cart.validator.js';
import { validationMiddleware } from '../middleware/validator.middleware.js';
import { validateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create', validateUser, cartValidator, validationMiddleware)

export default router;