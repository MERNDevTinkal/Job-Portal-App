import RecruiterProfileModel from "../../../models/recruiterProfileModel.js";

export const updateRecruiterProfile = async (req, res) => {
    try {
        
        const updatefields = req.body;

        const updateProfile = await RecruiterProfileModel.findOneAndUpdate(
            {userId : req.user._id},
            {$set: updatefields},
            {new : true}
        )

        if (!updateProfile) {
            return res.status(404).json({
              success: false,
              message: "Profile not found.",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            profile: updateProfile,
          });

    } catch (error) {
        console.error("Error in  updating Recruiter profile:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to update profile.",
          error: error.message,
        });
    }
}