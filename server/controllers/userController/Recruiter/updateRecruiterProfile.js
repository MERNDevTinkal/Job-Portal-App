import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";
import { createRecruiterProfileSchema } from "../../../validations/recruiterProfileValidation.js";
import fs from 'fs';
import path from 'path';

export const updateRecruiterProfile = async (req, res) => {
  try {
    // Validate request body
    try {
      createRecruiterProfileSchema.partial().parse(req.body);
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

    const updateFields = { ...req.body };
    
    // If new image is uploaded, add it to update fields
    if (req.file) {
      updateFields.profileImage = req.file.path;
      
      // Find existing profile to delete old image
      const existingProfile = await RecruiterProfileModel.findOne({ userId: req.user._id });
      if (existingProfile?.profileImage) {
        try {
          fs.unlinkSync(existingProfile.profileImage);
        } catch (err) {
          console.error("Error deleting old profile image:", err);
        }
      }
    }

    const updatedProfile = await RecruiterProfileModel.findOneAndUpdate(
      { userId: req.user._id },
      { $set: updateFields },
      { 
        new: true,
        runValidators: true // Ensure updated data passes model validation
      }
    ).select('-__v -createdAt -updatedAt'); // Exclude unnecessary fields

    if (!updatedProfile) {
      // Delete the uploaded file if profile not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Add full URL for the image if it exists
    const profileWithImageUrl = updatedProfile.toObject();
    if (profileWithImageUrl.profileImage) {
      profileWithImageUrl.profileImage = `${req.protocol}://${req.get('host')}/${profileWithImageUrl.profileImage.replace(/\\/g, '/')}`;
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: profileWithImageUrl,
    });

  } catch (error) {
    // Delete the uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error updating recruiter profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};