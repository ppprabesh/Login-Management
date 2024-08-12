import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {
  creatWebUserService,
  deleteWebUserService,
  loginWebUserService,
  readAllWebUserService,
  readSpecificWebUserService,
  updateWebUserService,
} from "../service/webUserService.js";
import { secretKey, url } from "../utils/constant.js";
import { sendEmail } from "../utils/sendmail.js";

export const createWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    data.isVerifiedEmail = false;
    data = {
      ...data,
      isVerifiedEmail: false,
    };
    let result = await creatWebUserService(data);
    let info = {
      id: result._id,
    };

    let expiryInfo = { expiresIn: "365d" };

    let token = jwt.sign(info, secretKey, expiryInfo);

    await sendEmail({
      from: '"Prabesh" <prabesh1902@gmail>',
      to: [req.body.email],
      subject: "Registation",
      html: `<h1>You have successfully registered to our system.</h1>
      <a href="${url}/verify-email?token=${token}">
      ${url}/verify-email?token=${token}</a>`,
    });
    res.status(201).json({
      sucess: true,
      message: "WebUser registered successfully.",
      result: result,
    });
  }
);

export const readAllWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await readAllWebUserService({});
    res.status(200).json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });
  }
);
export const verifyEmailController = expressAsyncHandler(
  async (req, res, next) => {
    res.json({
      success: true,
      message: "WebUser verified successfully",
    });
  }
);

export const readSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await readSpecificWebUserService(req.params.id);
    res.status(200).json({
      success: true,
      message: "User read successfully",
      result: result,
    });
  }
);

export const updateWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await updateWebUserService(req.params.id, req.body);
    res.status(201).json({
      success: true,
      message: "User updated successfully",
      result: result,
    });
  }
);

export const deleteWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await deleteWebUserService(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      result: result,
    });
  }
);

export const loginWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await loginWebUserService(req.body.email);

    if (result === null) {
      res.json({
        success: false,
        message: "Credentials does not match",
      });
    } else {
      let isValidPassword = await bcrypt.compare(
        req.body.password,
        result.password
      );

      if (isValidPassword) {
        let info = {
          id: result._id,
        };

        let expiryInfo = { expiresIn: "365d" };

        let token = jwt.sign(info, secretKey, expiryInfo);

        res.status(200).json({
          success: true,
          message: "Login Successfull",
          result,
          token,
        });
      } else {
        res.json({
          success: false,
          message: "Credentials does not match",
        });
      }
    }
  }
);

export const myUserProfileController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await readSpecificWebUserService(req.id);
    res.json({
      success: true,
      message: "myUserProfile read successfully",
      result: result,
    });
  }
);

export const updateProfileController = expressAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await updateWebUserService(req.id, data);

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      result: result,
    });
  }
);
export const updatePasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await readSpecificWebUserService(req.id);
    let hashPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await updateWebUserService(req.id, {
        password: newHashPassword,
      });

      res.status(201).json({
        success: true,
        message: "Password updated successfully",
        result: result,
      });
    }
  }
);

export const forgotPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await loginWebUserService(req.body.email);
    if (result) {
      let info = {
        id: result._id,
      };

      let expiryInfo = { expiresIn: "5d" };

      let token = jwt.sign(info, secretKey, expiryInfo);
      await sendEmail({
        from: '"Prabesh" <prabesh1902@gmail>',
        to: [req.body.email],
        subject: "Reset Password",
        html: `<h1>Please click on the given link to reset your password.</h1>
        <a href="${url}/reset.password?token=${token}">
        ${url}/reset-password?token=${token}</a>`,
      });
      res.status(200).json({
        success: true,
        message: "Link has been sent to the mail to reset password.",
        // result: result,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Email does not exist.",
        // result: result,
      });
    }
  }
);
export const resetPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let password = req.body.password;

    let hashPassword = await bcrypt.hash(password, 10);

    let result = await updateWebUserService(req.id, {
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Password reset succesfully",
      result: result,
    });
  }
);

console.log("hi");
