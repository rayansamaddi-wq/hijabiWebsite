import express from 'express';
import {
  createProduct,
  getProducts,
  getTopProducts,
  createProductReview,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCategories
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from './uploadRoutes.js';


const router = express.Router();

router
  .route('/')
  .post( protect, admin, createProduct)
  .get(getProducts);
  

router.get('/top', getTopProducts);
router.get('/categories', getProductCategories);

router.post('/reviews/:id',protect, createProductReview);

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;