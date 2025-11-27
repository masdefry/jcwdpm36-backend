import { Router } from 'express';
import { vehicleController } from '../controllers/vehicle.controller';
import multerUploader from '../middlewares/multer-uploader.middleware';

const router = Router();

router.post(
  '/',
  multerUploader(
    'src/uploads',
    ['jpg', 'jpeg', 'png', 'webp'],
    2 * 1024 * 1024, 
    'memory'
  ).fields([{ name: 'vehicleImages', maxCount: 3 }]),
  vehicleController.create
);

router.get('/', vehicleController.getAll)

export default router;
