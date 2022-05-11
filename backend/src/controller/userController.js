// modules
import crypto from "crypto";
// model
import User from "../models/userModel.js";
// utils
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import sendToken from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create User -- Admin
//first create user and then send back JWTtoken
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

  sendToken(res, 200, user);
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

  sendToken(res, 200, user);
});

//Logout User

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logout Successfully",
    });
});

// forget Password

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });
  // console.log("email:", email);

  if (!user) next(new ErrorHandler("User not found", 404));

  //generate token
  const resetToken = user.generateForgetPasswordToken();
  //wait for storing token into db
  await user.save({ validateBeforeSave: false });

  //reset Password Url
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/forget/${resetToken}`;

  // console.log("resetToken:", resetToken);
  // console.log("resetPasswordUrl:", resetPasswordUrl);
  const EmailMsg = `Your password reset token is:-\n\n${resetPasswordUrl} \n\n If You have not generate request,then ignore it.`;
  // console.log("EmailMsg:", EmailMsg);

  try {
    await sendEmail({
      email: email,
      subject: "Forget Password",
      message: EmailMsg,
    });

    res.status(200).json({
      success: true,
      message: `Forget password mail send to ${email} successfully.`,
    });
  } catch (error) {
    //if any error accure then reset the token and expires time
    user.resetPasswordTokan = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    next(new ErrorHandler(error.message, 500));
  }
});

// Reset password
export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordTokan = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(
    "resetPasswordTokan:",
    resetPasswordTokan,
    "\n$gt:",
    Date.now(),
    "$lt:",
    Date.now() - 15 * 60 * 60
  );
  const user = await User.findOne({
    resetPasswordTokan: resetPasswordTokan,
    resetPasswordExpire: { $lt: Date.now() },
  });

  if (!user) {
    next(
      new ErrorHandler(
        "Reset password token is invalid Or Token is expire,please try after some time!!",
        400
      )
    );
  }
  //if user exist check password is same
  if (req.body.password !== req.body.confirmPassword) {
    next(new ErrorHandler("Enter Same Password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordTokan = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(res, 200, user);
});
