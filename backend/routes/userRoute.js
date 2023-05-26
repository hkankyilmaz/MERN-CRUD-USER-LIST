import express from "express";
import * as userController from "../controllers/userController.js";
//import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/get-users").get(userController.getAllUsers);
// router
//   .route("/update")
//   .get(authMiddleware.authenticateToken, userController.updateUser);
// router
//   .route("/delete")
//   .get(authMiddleware.authenticateToken, userController.deleteUser);

export default router;
