import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validateMiddleware';
import { loginSchema, registerSchema } from '../validations/authSchema';

const router = Router();

router.post('/register', (req, res, next) => {
  console.log('➡️ Middleware chiamato, dati ricevuti:', req.body); 
  next();
}, validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

export default router;
