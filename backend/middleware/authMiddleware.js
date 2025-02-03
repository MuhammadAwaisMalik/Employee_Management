import jwt from "jsonwebtoken";
import User from "../models/user.js";

const verifyUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: No Token Provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Token Missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Invalid Token" });
    }
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, error: "Invalid Token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Token Expired" });
    }
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export default verifyUser;
