import Router from 'express';
import { postActorController } from '../controllers/actors.controller';
const router = Router();

router.post('/', postActorController);

export default router;
