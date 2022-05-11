import mongoose from "mongoose";
import validtor from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
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

//when password is hashed then not need to again hash.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// forget password token generation
userSchema.methods.generateForgetPasswordToken = function () {
  /**
   * this line will generate resetToken
   * randomBytes(20) will create 20 bit buffer
   * toString("hex") will convert buffer in hex string
   */
  const resetToken = crypto.randomBytes(20).toString("hex");

  // console.log("reset.token",resetToken);
  /**
   * this line generate hash of resetToken
   * createHash("sha256") will use sha256 Algorithm for generate hash
   * update(reserToken)
   * digest("hex")
   */
  this.resetPasswordTokan = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log("Hash:",crypto.createHash("sha256").update(resetToken).digest("hex"));
  // console.log("Time:",Date.now() + 15*60*60);

  // current time + 15 min
  this.resetPasswordExpire = Date.now() + 15 * 60 * 60;

  return resetToken;
};

export default mongoose.model("User", userSchema);
