import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    jobCategory: {
      type: String,
      enum: [
        "IT & Software",
        "Marketing & Sales",
        "Finance & Accounting",
        "Healthcare & Medicine",
        "Education & Training",
        "Engineering",
        "Design & Creative",
        "Human Resources",
        "Customer Service",
        "Administration",
        "Construction & Trades",
        "Hospitality & Tourism",
        "Legal",
        "Science & Research",
        "Other",
      ],
      required: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "remote"],
      required: true,
    },

    salary: {
      min: {
        type: Number,
        required: true,
        min: [0, "Min salary cannot be negative"],
      },
      max: {
        type: Number,
        required: true,
        validate: {
          validator: function (v) {
            return v >= this.salary.min;
          },
          message: "Max salary must be greater than or equal to min salary",
        },
      },
    },

    experience: {
      min: {
        type: Number,
        required: true,
        min: [0, "Min experience cannot be negative"],
      },
      max: {
        type: Number,
        required: true,
        min: [0, "Max experience cannot be negative"],
      },
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
