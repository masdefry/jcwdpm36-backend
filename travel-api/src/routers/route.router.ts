import { Router } from 'express';
import { routeController } from '../controllers/route.controller';
import { verifyToken } from '../middlewares/verify.token.middleware';
import { verifyRole } from '../middlewares/verify.role.middleware';
import { createRouteValidator } from '../validators/create-route.validator';
import { expressValidator } from '../middlewares/express-validator.middleware';

const router = Router();

router.post(
  '/',
  verifyToken,
  verifyRole(['ADMIN']),
  createRouteValidator,
  expressValidator,
  routeController.create
);

export default router;
