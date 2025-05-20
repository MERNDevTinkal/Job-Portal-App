import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";
import { createRecruiterProfileSchema } from "../../../validations/recruiterProfileValidation.js";

export const createRecruiterProfile = async (req, res) => {
  try {
    // Validate request body
    try {
      createRecruiterProfileSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || "Validation failed"
      });
    }

    const { 
      companyName, 
      companyWebsite, 
      companyDescription, 
      companyLocation,
      country,
      state,
      profileImage
    } = req.body;

    // Check if profile already exists
    const existingProfile = await RecruiterProfileModel.findOne({
      userId: req.user._id
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user"
      });
    }

    // Create profile data
    const profileData = {
      userId: req.user._id,
      companyName,
      companyWebsite,
      companyDescription,
      companyLocation,
      country,
      state,
      profileImage: profileImage || "" 
    };

    // Create and save profile
    const profile = await RecruiterProfileModel.create(profileData);

    res.status(201).json({
      success: true,
      message: "Recruiter profile created successfully",
      profile
    });

  } catch (error) {
    console.error("Error in creating recruiter profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
