import { Router } from 'express';
import { cityController } from '../controllers/city.controller';
import { verifyToken } from '../middlewares/verify.token.middleware';
import { verifyRole } from '../middlewares/verify.role.middleware';
import { createCityValidator } from '../validators/create-city.validator';
import { expressValidator } from '../middlewares/express-validator.middleware';
import { JWT_SECRET_KEY_AUTH } from '../config/index.config';

const router = Router();

router.post(
  '/',
  verifyToken(JWT_SECRET_KEY_AUTH!),
  verifyRole(['ADMIN']),
  createCityValidator,
  expressValidator,
  cityController.create
);

router.get('/', cityController.getAll);

export default router;
