import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema.js";

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    let validateddata;

    try {
      validateddata = resetPasswordSchema.parse({
        newPassword,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message).join(" ,"),
      });
    }

    const user = await userModel.findOne({ forgotPasswordToken: token });
    // console.log("User found for token:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token.",
      });
    }

    if (user.forgotPasswordTokenExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Reset token has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in password reset:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};
