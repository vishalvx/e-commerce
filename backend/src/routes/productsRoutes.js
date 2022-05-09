import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controller/productsController.js";
import isAuthenticatedUser from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
/**
 * here i use multiple method using single route
 * if method === put then update Product
 * if method === delete then delete Product
 * if Method === Get then get Product Details
 */
router
  .route("/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(isAuthenticatedUser, getProductDetails);

export default router;
