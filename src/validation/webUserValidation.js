import Joi from "joi";

let webUserValidation = Joi.object()
  .keys({
    fullName: Joi.string()
      .required()
      .min(3)
      .max(20)
      .messages({
        "string.base": "fullName should be a string",
        "string.empty": "fullName cannot be empty",
        "string.min": "fullName should have atleast 3 characters",
        "string.max": "fullName should have atmost 20 characters",
        "any.required": "fullName is required", // to make error more formal in frontend
      })
      .allow(""),

    gender: Joi.string()
      .required()
      .lowercase()
      .valid("male", "female", "other")
      .messages({
        "string.base": "gender should be a string",
        "any.only": "gender must be one of male, female, or other",
        "any.required": "gender is required",
      }),

    email: Joi.string()
      .required()
      .custom((value, msg) => {
        let validEmail = value.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
        if (validEmail) {
          return true;
        } else {
          return msg.message("email is not valid");
        }
      })
      .messages({
        "string.base": "email should be a string",
        "string.email": "email must be a valid email",
        "any.required": "email is required",
      }),
    password: Joi.string()
      .required()
      .custom((value, msg) => {
        let validPassword = value.match(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/
        );
        if (validPassword) {
          return true;
        } else {
          return msg.message(`At least 8 characters
      At most 30 characters
      At least one special character
      At least one uppercase letter
      At least one lowercase letter`);
        }
      })
      .messages({
        "string.base": "password should be a string",
        "any.required": "password is required",
      }),
    dob: Joi.date().required().messages({
      "date.base": "dob should be a valid date",
      "any.required": "dob is required",
    }),

    role: Joi.string()
      .required()
      .lowercase()
      .valid("admin", "superAdmin", "customer")
      .messages({
        "string.base": "role should be a string",
        "any.only": "role must be one of admin, superAdmin, or customer",
        "any.required": "role is required",
      }),
  })
  .unknown(false);

export default webUserValidation;
