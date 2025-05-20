import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";

export const getRecruiterProfile = async (req, res) => {
  try {
    const profile = await RecruiterProfileModel.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    console.error("Error in fetching recruiter profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};