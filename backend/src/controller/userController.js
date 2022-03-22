// model
import User from "../models/userModel.js";
// utils
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";

// Create User -- Admin
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is Id",
      url: "public URL",
    },
  });

  //JWT TOKEN

  const token = await user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("PLease enter email and Password", 400));
  }
  //data is given then find User
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //check is Password is Same or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }

  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
