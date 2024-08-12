import { readSpecificWebUserService } from "../service/webUserService.js";

const authorized = (roles) => {
  return async (req, res, next) => {
    console.log(roles);
    try {
      let result = await readSpecificWebUserService(req.id);
      console.log(req.id);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(400).json({
          success: false,
          message: "User not authorized",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};
export default authorized;
