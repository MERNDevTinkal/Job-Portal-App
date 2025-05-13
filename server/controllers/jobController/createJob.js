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

    const { title, description, jobType, salary, openings } = parsed.data;

    const job = await JobModel.create({
      title,
      description,
      jobType,
      salary,
      openings,
      recruiter: req.user._id,
      recruiterProfile: req.recruiterProfile._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};