import express from "express";
import {
  deleteUser,
  forgetPassword,
  getProfile,
  getSingleUser,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateRoll,
  updateUserProfile,
} from "../controller/userController.js";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/password/forget").post(isAuthenticatedUser, forgetPassword);
router.route("/password/reset/:token").put(isAuthenticatedUser, resetPassword);
router.route("/me").get(isAuthenticatedUser, getProfile);

router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateRoll)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

export default router;
