import mongoose from "mongoose";

const jobSeekerProfileSchema = new mongoose.Schema({
    
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  education: [{
    degree: String,
    university: String,
    yearOfGraduation: String,
  }],

  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String,
  }],

  skills: [{
    type: String,
  }],

  portfolioLinks: [{
    title: String,
    url: String,
  }],

}, {
  timestamps: true,
});

const JobSeekerProfile = mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);
export default JobSeekerProfile;
