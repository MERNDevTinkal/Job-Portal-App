import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema({
    
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  companyName: {
    type: String,
    required: true,
  },

  companyWebsite: {
    type: String,
  },

  companyDescription: {
    type: String,
  },

  companyLocation: {
    type: String,
    required: true,  
  },

}, {
  timestamps: true,
});

const RecruiterProfileModel = mongoose.model("RecruiterProfile", recruiterProfileSchema);
export default RecruiterProfileModel;
