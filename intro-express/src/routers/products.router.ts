/*
    ROUTER:
    1. Handle routing
*/
import { Router } from 'express';
import {
  deleteProductController,
  getProductsController,
  postProductController,
  putProductController,
} from '../controllers/products.controller';

const router = Router();

router.get('/', getProductsController);
router.post('/', postProductController);
router.put('/:id', putProductController);
router.delete('/:id', deleteProductController);

export default router;
