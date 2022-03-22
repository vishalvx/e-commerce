// model
import User from "../models/userModel.js";
// utils
import ErrorHandler from "../utils/errorHandler.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";

// Create User -- Admin
export const registerUser = asyncHandler(async (req, res, next) => {

    const { name,email,password}= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
          public_id:"this is Id",
          url:"public URL", 
        }
      })

    // const  = await User.create();
  
    res.status(201).json({
      success: true,
      user,
    });
  });