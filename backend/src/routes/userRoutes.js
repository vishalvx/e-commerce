import express from "express";
import { forgetPassword, loginUser, logoutUser, registerUser, resetPassword } from "../controller/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
