import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";
import { createRecruiterProfileSchema } from "../../../validations/recruiterProfileValidation.js";
import fs from "fs";
import path from "path";

export const createRecruiterProfile = async (req, res) => {
  try {
    // Validate request body
    try {
      createRecruiterProfileSchema.parse(req.body);
    } catch (error) {
      // Delete the uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || "Validation failed",
      });
    }

    const {
      companyName,
      companyWebsite,
      companyDescription,
      companyLocation,
      country,
      state,
    } = req.body;

    // Check if profile already exists
    const existingProfile = await RecruiterProfileModel.findOne({
      userId: req.user._id,
    });

    if (existingProfile) {
      // Delete the uploaded file if profile already exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
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
      profileImage: req.file ? req.file.path : null
    };

    // Create and save profile
    const profile = await RecruiterProfileModel.create(profileData);

    // Add full URL for the image if it exists
    const profileWithImageUrl = profile.toObject();
    if (profileWithImageUrl.profileImage) {
      const normalizedPath = profileWithImageUrl.profileImage
        .replace(/\\/g, '/')
        .replace('public/', '');
      profileWithImageUrl.profileImage = `${req.protocol}://${req.get('host')}/${normalizedPath}`;
    }

    res.status(201).json({
      success: true,
      message: "Recruiter profile created successfully",
      profile: profileWithImageUrl,
    });
  } catch (error) {
    // Delete the uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error in creating recruiter profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

