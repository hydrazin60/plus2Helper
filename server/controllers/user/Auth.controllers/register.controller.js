import UserModel from "../../../models/User_models/user.models.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { log } from "console";
import { sendVerificationEmail } from "../../../utils/sendVerificationemail.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileNumberRegex = /^\+?[0-9]{10}$/;
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }
    if (!emailRegex.test(email) || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format! Please enter a valid email.",
        error: true,
      });
    }
    if (
      !mobileNumberRegex.test(mobileNumber) ||
      !validator.isMobilePhone(mobileNumber)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid mobile number format! Please enter a valid mobile number.",
        error: true,
      });
    }
    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({
        success: false,
        message:
          "Full name can only contain letters and spaces, and must not include symbols or numbers.",
        error: true,
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        error: true,
      });
    }
    const isHashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      fullName,
      email,
      password: isHashPassword,
      mobileNumber,
    });

    user.VerificationToken = crypto.randomBytes(20).toString("hex");
    await user.save();
    sendVerificationEmail(user.email, user.VerificationToken);
    const userData = user.toObject();
    delete userData.password;
    return res.status(201).json({
      success: true,
      message: `${user.fullName} successfully registered! please check your email to verify your account`,
      data: userData,
    });
  } catch (error) {
    console.log(`
     Something went wrong on Registering the user ${error.message} `);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  const token = req.params.token;
  const user = await UserModel.findOne({ VerificationToken: token });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      error: true,
    });
  }
  const userdata = user.toObject();
  delete userdata.password;
  user.isVerified = true;
  user.VerificationToken = undefined;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "User verified successfully",
    data: userdata,
  });
};

export const login = async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }
    if (!emailRegex.test(email) || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format! Please enter a valid email.",
        error: true,
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email! please register first",
        error: true,
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password! try again",
        error: true,
      });
    }
    const userdata = existingUser.toObject();
    delete userdata.password;

    const Token = await jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res
      .cookie("token", Token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Adjust for development
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        success: true,
        message: `Welcome ${userdata.fullName} to our +2Helper education portal`,
        data: userdata,
      });
  } catch (error) {
    console.log(`
     Something went wrong on  Login the user ${error.message} `);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

 
