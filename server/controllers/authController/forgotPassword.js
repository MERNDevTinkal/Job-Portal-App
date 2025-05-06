import crypto from "crypto";
import userModel from "../../models/userModel.js";
import { sendResetEmail } from "../../Helpers/sendResetEmail.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Your Email is not registered or verified",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const forgotTokenExpire = new Date(Date.now() + 60 * 60 * 1000);

    user.forgotPasswordToken = resetToken;
    user.forgotPasswordTokenExpire = forgotTokenExpire;
    await user.save();

    const resetUrl = `${process.env.PUBLIC_BASE_URL}/resetPassword/${resetToken}`;

    const result = await sendResetEmail(user.email, user.name, resetUrl);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "reset email not sent",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Reset email sent to your emailID",
    });
  } catch (error) {
    console.log("Error in forgot password :", error);
    return res.status(500).json({
      success: false,
      message: "failed forgot password",
    });
  }
};
