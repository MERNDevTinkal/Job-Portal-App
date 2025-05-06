import { sendEmail } from "../lib/nodemailer.js";
import { resetEmailHTML } from "../EmailTemplate/resetPasswordTemplate.js"

export const sendResetEmail = async (email, name, resetLink) => {
  try {
    await sendEmail({
      to: email,
      subject: "JOB PORTAL APP  || Reset Your Password",
      html: resetEmailHTML(name, resetLink),
    });
    return { success: true, message: "Reset password email sent successfully." };
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return { success: false, message: "Failed to send reset password email." };
  }
};