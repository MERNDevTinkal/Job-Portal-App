import JobSeekerModel from "../../../models/jobSeekerProfileModel.js";

export const updateJobSeekerProfile = async (req, res) => {
  try {

    const updatedFields = req.body;

    const updatedProfile = await JobSeekerModel.findOneAndUpdate(
      { userId: req.user._id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error in  updating Job Seeker profile:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
      error: error.message,
    });
  }
};
