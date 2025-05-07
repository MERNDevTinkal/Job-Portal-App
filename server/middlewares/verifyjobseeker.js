import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const verifyjobseeker = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await userModel.findById(decoded.userId).select("-password");
  
      if (!user || user.role !== "jobseeker") {
        return res.status(403).json({
          success: false,
          message: "Access denied. jobseeker only.",
        });
      }
  
      req.user = user;
      next();
  
    } catch (error) {
      console.error("Error in verifyjobseeker : ", error);
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };