import mongoose from "mongoose";
import { dbUrl } from "../utils/constant.js";

const connectTOMongodb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("application is connected to database successfully.");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectTOMongodb;
