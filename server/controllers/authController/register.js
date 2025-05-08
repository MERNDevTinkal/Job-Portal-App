import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { SendEmailOTP } from "../../Helpers/SendEmailOTP.js";
import { registerSchema } from "../../validations/registerSchema.js";

export const register = async (req, res) => {
  
  try {
    const { name, email, password, role, profileImage, resume } = req.body;

   
    let validatedData;
    try {
      validatedData = registerSchema.parse({
        name,
        email,
        password,
        role,
        profileImage,
        resume,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.errors.map(err => err.message).join(", "),
      });
    }

    const normalizedEmail = validatedData.email; 
    const trimmedName = validatedData.name; 
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireTime = new Date(Date.now() + 60 * 60 * 1000);

    const existingEmailUser = await userModel.findOne({
      email: normalizedEmail,
    });

    if (existingEmailUser && existingEmailUser.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "User already registered with this email.",
      });
    }

    if (existingEmailUser && !existingEmailUser.isEmailVerified) {
      existingEmailUser.name = trimmedName;
      existingEmailUser.password = hashedPassword;
      existingEmailUser.emailOTP = emailOTP;
      existingEmailUser.emailOTPExpire = otpExpireTime;
      await existingEmailUser.save();

      const emailResult = await SendEmailOTP(
        normalizedEmail,
        trimmedName,
        emailOTP
      );
      if (!emailResult.success) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send email OTP" });
      }

      return res
        .status(200)
        .json({ success: true, message: "New OTP sent to your email." });
    }

    const user = await userModel.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      emailOTP,
      emailOTPExpire: otpExpireTime,
      isEmailVerified: false,
      role: validatedData.role, 
      profileImage: profileImage || "",
      resume: resume || "",
    });

    const emailResult = await SendEmailOTP(
      normalizedEmail,
      trimmedName,
      emailOTP
    );
    if (!emailResult.success) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email OTP" });
    }

    return res.status(201).json({
      success: true,
      message: "Verification OTPs sent to your email.",
    });
  } catch (error) {
    console.error("Error in Register:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
