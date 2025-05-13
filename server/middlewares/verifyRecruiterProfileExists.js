import recruiterProfileModel from "../models/recruiterProfileModel.js";

export const verifyRecruiterProfileExists = async (req, res, next) => {
  try {
    const profile = await recruiterProfileModel.findOne({ userId: req.user._id });

    if (!profile) {
      return res.status(403).json({
        success: false,
        error: {
          code: 403,
          message: "Recruiter profile not found. Please create your profile first."
        }
      });
    }

    req.recruiterProfile = profile;
    next();
  } catch (error) {
    console.error("verifyRecruiterProfileExists error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking recruiter profile",
    });
  }
};
