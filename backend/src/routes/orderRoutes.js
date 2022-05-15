import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/myorder").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder);

export default router;
