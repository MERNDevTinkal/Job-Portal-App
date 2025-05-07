import JobSeekerModel from "../../../models/jobSeekerProfileModel.js";

export const createJobSeekerProfile = async (req, res) => {
  try {
    const { education, experience, skills, portfolioLinks } = req.body;

    const existingProfile = await JobSeekerModel.findOne({ userId: req.user._id });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Job Seeker profile already exists.",
      });
    }

    const profile = await JobSeekerModel.create({
      userId: req.user._id,
      education,
      experience,
      skills,
      portfolioLinks,
    });

    return res.status(201).json({
      success: true,
      message: "Job Seeker profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error("Error in creating Job Seeker profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Job Seeker profile.",
      error: error.message,
    });
  }
};
