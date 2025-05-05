import userModel from "../../models/userModel";
import bcrypt from "bcrypt";
import { SendEmailOTP } from "../../Helpers/SendEmailOTP";
import { SendPhoneOTP } from "../../Helpers/SendPhoneOTP";

export const register = async (req, res) => {
  try {
    const { name, phone, email, password, role, profileImage, resume } =
      req.body;

    if (!name || !phone || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const hashedPassword = await bcrypt.hash(password, 10);
    const phoneOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpireTime = new Date(Date.now() + 60 * 60 * 1000);

    // if phone number is already verified

    const existingPhoneUser = await userModel.findOne({ phone });
    if (existingPhoneUser && existingPhoneUser.isPhoneVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already registered with this phone number.",
        });
    }

    // if email is already verified

    const existingEmailUser = await userModel.findOne({
      email: normalizedEmail,
    });
    if (existingEmailUser && existingEmailUser.isEmailVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already registered with this email.",
        });
    }

    // registerd but phone not verified

    if (existingPhoneUser && !existingPhoneUser.isPhoneVerified) {
      existingPhoneUser.name = trimmedName;
      existingPhoneUser.password = hashedPassword;
      existingPhoneUser.phoneOTP = phoneOTP;
      existingPhoneUser.phoneOTPExpire = otpExpireTime;
      await existingPhoneUser.save();
      await SendPhoneOTP(phone, phoneOTP);
      return res
        .status(200)
        .json({ success: true, message: "New OTP sent to your phone number." });
    }

    // registeded but email not verified

    if (existingEmailUser && !existingEmailUser.isEmailVerified) {
      existingEmailUser.name = trimmedName;
      existingEmailUser.password = hashedPassword;
      existingEmailUser.emailOTP = emailOTP;
      existingEmailUser.emailOTPExpire = otpExpireTime;
      await existingEmailUser.save();
      await SendEmailOTP(normalizedEmail, trimmedName, emailOTP);
      return res
        .status(200)
        .json({ success: true, message: "New OTP sent to your email." });
    }

    const user = await userModel.create({
      name: trimmedName,
      phone,
      email: normalizedEmail,
      password: hashedPassword,
      phoneOTP,
      phoneOTPExpire: otpExpireTime,
      isPhoneVerified: false,
      emailOTP,
      emailOTPExpire: otpExpireTime,
      isEmailVerified: false,
      role,
      profileImage: profileImage || "",
      resume: resume || "",
    });

    await SendPhoneOTP(phone, phoneOTP);
    await SendEmailOTP(normalizedEmail, trimmedName, emailOTP);

    return res.status(201).json({
      success: true,
      message: "Verification OTPs sent to your phone and email.",
    });
  } catch (error) {
    console.error("Error in Register:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
