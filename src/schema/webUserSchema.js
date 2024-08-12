import { Schema } from "mongoose";

let webUserSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName field is required."],
    },
    password: {
      type: String,
      required: [true, "password field is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email field is required"],
    },
    gender: {
      type: String,
      required: [true, "gender field is required."],
    },
    dob: {
      type: Date,
      required: [true, "dob field is required."],
    },
    role: {
      type: String,
      required: [true, "role field is required"],
    },
    isVerifiedEmail: {
      type: Boolean,
      // required: [true, "isVerifiedEmail is required"],
    },
  },
  { timestamps: true }
);

export default webUserSchema;
