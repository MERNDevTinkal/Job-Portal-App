import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;

    next();
    
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

export default isAuthenticated;