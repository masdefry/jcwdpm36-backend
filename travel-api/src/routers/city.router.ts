import { Router } from 'express';
import { cityController } from '../controllers/city.controller';
import { verifyToken } from '../middlewares/verify.token.middleware';
import { verifyRole } from '../middlewares/verify.role.middleware';

const router = Router();

router.post('/', verifyToken, verifyRole(['ADMIN']), cityController.create);

export default router;
