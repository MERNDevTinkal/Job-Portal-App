import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  emailOTP: {
    type: String,
  },

  emailOTPExpire: {
    type: Date,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["recruiter", "jobseeker"],
    default: "jobseeker",
    required : true,
  },

  profileImage: {
    type: String,
    default: "",
  },

  resume: {
    type: String,
    default: "",
  },

  forgotPasswordToken: {
    type: String,
    default: "",
  },

  forgotPasswordTokenExpire: {
    type: Date,
    default: null,
  },

}, {
  timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
