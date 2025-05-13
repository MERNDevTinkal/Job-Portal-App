import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "remote"],
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recruiterProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterProfile",
      required: true,
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    openings: {
      type: Number,
      required: true,
      default: 1,
      min: [1, "Openings must be at least 1"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
