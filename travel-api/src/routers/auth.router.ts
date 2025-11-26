import { Router } from 'express';
import { authController } from './../controllers/auth.controller';
import { verifyToken } from '../middlewares/verify.token.middleware';
import { JWT_SECRET_KEY_EMAIL_VERIFICATION } from '../config/index.config';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/email-verification', verifyToken(JWT_SECRET_KEY_EMAIL_VERIFICATION!), authController.emailVerification);

export default router;
