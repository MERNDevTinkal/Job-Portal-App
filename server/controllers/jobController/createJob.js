import JobModel from "../../models/jobModel.js";
import { createJobSchema } from "../../validations/jobValidation.js";

export const createJob = async (req, res) => {
  try {
    const parsed = createJobSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const {
      title,
      skills,
      jobType,
      salary,
      experience,
      openings,
      jobCategory,
    } = parsed.data;

    // Create a new job
    const job = await JobModel.create({
      title,
      skills,
      jobType,
      salary,
      experience,
      openings,
      jobCategory,
      recruiter: req.user._id,
      recruiterProfile: req.recruiterProfile._id,
    });

    // Format response to include "LPA" and "years"
    const formattedJob = {
      ...job.toObject(),
      salaryRange: `${job.salary.min} - ${job.salary.max} LPA`,
      experienceRange: `${job.experience.min} - ${job.experience.max} years`,
    };

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: formattedJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};
