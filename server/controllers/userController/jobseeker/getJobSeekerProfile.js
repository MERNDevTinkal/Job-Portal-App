import JobSeekerModel from "../../../models/jobSeekerProfileModel.js";

export const getJobSeekerProfile = async (req, res) => {
  try {

    const profile = await JobSeekerModel.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:"user profile",
      profile,
    });
    
  } catch (error) {
    console.error("Error fetching Job Seeker profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
      error: error.message,
    });
  }
};
