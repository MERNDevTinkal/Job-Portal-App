import JobModel from "../../models/jobModel.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find({
      isActive: true,
      recruiter: req.user._id,
    })
      .populate({
        path: "recruiter",
        select: "name email",
      })
      .populate({
        path: "recruiterProfile",
        select: "companyName companyLocation",
      });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};
