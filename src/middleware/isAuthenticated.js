import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/constant.js";

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    let infoObj = jwt.verify(token, secretKey);
    let id = infoObj.id;
    req.id = id;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Please login",
    });
  }
});

export default isAuthenticated;
