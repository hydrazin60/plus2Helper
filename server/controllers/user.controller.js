import User from "../models/user.models.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { username, email, mobileNumber, password } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide a username",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide a password",
      });
    }
    if (!email && !mobileNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide a valid email OR mobile number",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "You are already registered! Please login.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      mobileNumber,
      password: hashedPassword,
    });
    await user.save();
    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({
      success: true,
      error: false,
      message: `Welcome ${username} to our +2Helper Platform`,
      userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
