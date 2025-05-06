import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verify = async (req, res) => {

    try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided, authentication failed",
        });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      const user = await userModel.findById(decoded.userId).select("-password");
  
      if (!user) {
        return res.status(200).json({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Verify error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  