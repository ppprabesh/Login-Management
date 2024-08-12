import cors from "cors";
import express, { json } from "express";
import connectTOMongodb from "./src/connectDB/connectToMongodb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import webUserRouter from "./src/routes/webUserRouter.js";

let expressApp = express();
expressApp.use(express.static("./public"));
expressApp.use(cors());
expressApp.use(json());
connectTOMongodb();

expressApp.listen(8000, () => {
  console.log("express app is listening at port 8000");
});

expressApp.use("/webUsers", webUserRouter);
expressApp.use(errorMiddleware);
