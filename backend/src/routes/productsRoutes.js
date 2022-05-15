import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductAllReviews,
  deleteProductReview,
} from "../controller/productsController.js";
import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
/**
 * here i use multiple method using single route
 * if method === put then update Product
 * if method === delete then delete Product
 * if Method === Get then get Product Details
 */
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router
  .route("/product/reviews")
  .get(isAuthenticatedUser, getProductAllReviews)
  .delete(isAuthenticatedUser, deleteProductReview);

router.route("/product/:id").get(isAuthenticatedUser, getProductDetails);

router
  .route("/product/review")
  .put(isAuthenticatedUser, createProductReview);

export default router;
