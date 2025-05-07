import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";

export const createRecruiterProfile = async (req, res) => {
  try {
    const { companyName, companyWebsite, companyDescription, companyLocation } =
      req.body;

    const existingProfile = await RecruiterProfileModel.findOne({
      userId: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await RecruiterProfileModel.create({
      userId: req.user._id,
      companyName,
      companyWebsite,
      companyDescription,
      companyLocation,
    });

    res.status(201).json({
      success: true,
      message: "Recruiter profile created successfully",
      profile,
    });

  } catch (error) {
    
    console.log("error in creating recruiterProfile", error);
    res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
};
