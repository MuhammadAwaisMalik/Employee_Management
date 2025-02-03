import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: { _id: user._id, role: user.role, name: user.name },
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
