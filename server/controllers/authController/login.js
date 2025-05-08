import userModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginSchema } from "../../validations/loginSchema.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let validateddata;

    try {
      validateddata = loginSchema.parse({
        email,
        password
      })
    } catch (error) {
      return res.status(400).json({
        success : false,
        message : error.errors.map(err => err.message).join(" ,"),
      })
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    //  Check if user is verified before allowing login

    if (!existingUser.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back ${existingUser.name}`,
        token,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
