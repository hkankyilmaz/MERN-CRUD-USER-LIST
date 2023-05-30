import express from "express";
import * as userController from "../controllers/userController.js";
//import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/users").get(userController.getAllUsers);
router.route("/update").post(userController.updateUser);
router.route("/updates").post(userController.updateUsers);
router.route("/delete").post(userController.deleteUser);

export default router;
