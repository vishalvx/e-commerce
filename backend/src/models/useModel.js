import mongoose from "mongoose";
import validtor from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [40, "Name should less than 40 charactors"],
    minlength: [3, "Name should greater than 3 charactors"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validtor.isEmail, "Please Enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password must greater than 8 charactors"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordTokan: String,
  resetPasswordExpire: Date,
});

export default mongoose.Model("User", userSchema);