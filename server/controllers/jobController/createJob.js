import JobModel from "../../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, jobType, salary, openings } = req.body;

    const job = await JobModel.create({
      title,
      description,
      jobType,
      salary,
      openings,
      recruiter: req.user._id,
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
