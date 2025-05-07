import ApplicationModel from "../../models/applicationModel.js";
import JobModel from "../../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await JobModel.findById(jobId);

    if (!job || !job.isActive) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found or inactive." });
    }

    const alreadyApplyed = await ApplicationModel.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (alreadyApplyed) {
      return res
        .status(400)
        .json({
          success: false,
          message: " you have Already applied for this job.",
        });
    }

    const createApplication = ApplicationModel.create({
      job: jobId,
      applicant: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Applied to job successfully.",
      createApplication,
    });
  } catch (error) {
    console.error("Apply error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to apply.",
        error: error.message,
      });
  }
};
