import { sendEmail } from "../lib/nodemailer.js";
import { welcomeEmailHTML } from "../EmailTemplate/WelcomeEmailTemplate.js"

export const sendWelcomeEmail = async ({ email, name }) => {
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Job Portal App",
        html: welcomeEmailHTML(name),
      });
  
      return { success: true };
    } catch (error) {
      console.error("Welcome email failed:", error);
      return { success: false };
    }
  };
  