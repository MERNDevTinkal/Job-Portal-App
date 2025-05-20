import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";
import { createRecruiterProfileSchema } from "../../../validations/recruiterProfileValidation.js";


export const updateRecruiterProfile = async (req, res) => {
  try {
    // Validate request body
    try {
      createRecruiterProfileSchema.partial().parse(req.body);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || "Validation failed",
      });
    }

    const updateFields = req.body;

    const updatedProfile = await RecruiterProfileModel.findOneAndUpdate(
      { userId: req.user._id },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });

  } catch (error) {
    console.error("Error updating recruiter profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};