import JobModel from "../../models/jobModel.js";

export const deleteJob = async (req, res) => {

    try {
        const { jobId } = req.params;

        const deleteJob = await JobModel.findByIdAndDelete(jobId)
    
        if(!deleteJob){
            return res.status(400).json({
                success : false,
                message : "job not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
          });
        
    } catch (error) {
        console.error("Error in deleting job:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to deleted job",
          error: error.message,
        });
    }
}