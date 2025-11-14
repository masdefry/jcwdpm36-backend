import { Router } from 'express';
import { libraryController } from '../controllers/library.controller';

const router = Router();

router.post('/', libraryController.create);

export default router;
