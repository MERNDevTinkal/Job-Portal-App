import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
    unique: true
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    maxlength: [100, "Company name cannot exceed 100 characters"]
  },
  companyWebsite: {
    type: String,
    required: [true, "Company website is required"],
    trim: true,
  },
  companyDescription: {
    type: String,
    required: [true, "Company description is required"],
    trim: true,
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  companyLocation: {
    type: String,
    required: [true, "Company location is required"],
    trim: true,
    maxlength: [100, "Location cannot exceed 100 characters"]
  },
  country: {
    type: String,
    required: false, 
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  profileImage: {
    type: String,
    default: ""
  }
}, {
  timestamps: true,
  
});

const RecruiterProfileModel = mongoose.model("RecruiterProfile", recruiterProfileSchema);
export default RecruiterProfileModel;