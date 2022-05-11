import User from "../models/userModel.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

/**Check is user login or not */

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  //getting token from request
  const { token } = req.cookies;
  // console.log(req.cookies);

  if (!token) {
    next(new ErrorHandler("Please login first to access this resource", 401));
  }

  // if there is token then check token data valid or not
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //if we cant find id then error accure and catch it
  req.user = await User.findById({ _id: decodedData._id });

  next();
});

//authorized Role
const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resoure`,
          403
        )
      );
    }
    next();
  };
};

export  { isAuthenticatedUser,  authorizedRoles };
