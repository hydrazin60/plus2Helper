import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { log } from "console";
import crypto from "crypto";
export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    log(username, email, password);
    if (!username || !email || !password) {
      return res.status(409).json({
        success: false,
        message: "ALl fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered! please login",
      });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hasedPassword,
    });

    // newUser.verificationToken = crypto.randomBytes(32).toString("hex");
    // await newUser.save();
    // await sendverificationEmail(newUser.email, newUser.verificationToken);
    return res.status(201).json({
      success: true,
      message: `Registered successfully! Please verify your email. Click on the link sent to your email.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Register Failed! Please try again",
    });
  }
};
