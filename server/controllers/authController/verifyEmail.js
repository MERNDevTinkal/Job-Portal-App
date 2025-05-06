// controllers/authController/verifyEmail.js
import userModel from "../../models/userModel.js";
import { sendWelcomeEmail } from "../../Helpers/WelcomeEmail.js"

export const VerifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ success: false, message: "Code required" });
    }

    const user = await userModel.findOne({ emailOTP: verificationCode });

    if (!user || user.emailOTPExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired code.",
      });
    }

    user.isEmailVerified = true;
    user.emailOTP = null;
    user.emailOTPExpire = null;
    await user.save();

    const result = await sendWelcomeEmail({
      email: user.email,
      name: user.name,
    });

    if (!result.success) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send welcome email" });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. Welcome email sent.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

