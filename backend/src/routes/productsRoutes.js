import express from "express";
import { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } from "../controller/productsController.js";

const router =express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
/**
 * here i use multiple method using single route
 * if method === put then update Product 
 * if method === delete then delete Product 
 * if Method === Get then get Product Details
 */
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

export default router;