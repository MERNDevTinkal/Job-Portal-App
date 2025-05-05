import { sendEmail } from "@/lib/nodemailer";
import { verificationEmailHTML } from "../EmailTemplate/verificationEmail";

export const SendEmailOTP = async (email, name, emailOTP) => {
  try {
    await sendEmail({
      to: email,
      subject: "JOB PORTAL APP || Verify Your Email",
      html: verificationEmailHTML(name, emailOTP),
    });

    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
};
