import { Router } from "express";
import {
  createWebUserController,
  deleteWebUserController,
  forgotPasswordController,
  loginWebUserController,
  myUserProfileController,
  readAllWebUserController,
  readSpecificWebUserController,
  resetPasswordController,
  updatePasswordController,
  updateProfileController,
  updateWebUserController,
  verifyEmailController,
} from "../controller/webUserController.js";
import authorized from "../middleware/authorized.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

let webUserRouter = Router();

webUserRouter
  .route("/")
  .post(createWebUserController)
  .get(readAllWebUserController);

webUserRouter
  .route("/verify-email")
  .patch(isAuthenticated, verifyEmailController);

webUserRouter.route("/login").get(loginWebUserController);
webUserRouter
  .route("/my-profile")
  .get(isAuthenticated, myUserProfileController);
webUserRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileController);
webUserRouter
  .route("/update-password")
  .patch(isAuthenticated, updatePasswordController);
webUserRouter.route("/forgot-password").post(forgotPasswordController);
webUserRouter
  .route("/reset-password")
  .patch(isAuthenticated, resetPasswordController);

webUserRouter
  .route("/:id")
  .get(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    readSpecificWebUserController
  )
  .patch(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    updateWebUserController
  )
  .delete(isAuthenticated, authorized(["superAdmin"]), deleteWebUserController);

export default webUserRouter;
