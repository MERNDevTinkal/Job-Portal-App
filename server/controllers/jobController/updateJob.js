import JobModel from "../../models/jobModel.js";

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updateFields = req.body;  

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $set: updateFields },
      { new: true } 
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};
