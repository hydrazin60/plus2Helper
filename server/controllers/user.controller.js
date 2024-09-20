import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
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

    newUser.verificationToken = crypto.randomBytes(32).toString("hex");
    await newUser.save();
    await sendVerificationEmail(newUser.email, newUser.verificationToken);
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

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const transpoter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      form: process.env.EMAIL,
      to: email,
      subject: "Please verify your account",
      text: `Click on the link to verify your email:http://localhost:4000/plus2Helper/api/v1/users/verify/${verificationToken} `,
    };
    /*
      const mailOptions = {
      form: process.env.EMAIL,
      to: email,
      subject: "Please verify your account",
      html: `
      <h1>Please verify your account</h1>
      <p>Please click on the link below to verify your account</p>
      <a href="http://localhost:3000/verify/${verificationToken}">Verify Account</a>`,
    };*/
    await transpoter.sendMail(mailOptions);
    console.log(`Verification email sent sucessfully `);
  } catch (error) {
    console.log(`Error sending verification email: ${error.message}`);
    return res.sendStatus(500).json({
      success: false,
      message: "Error sending verification email. Please try again",
    });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const token = req.params.verificationToken;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please register",
      });
    }
    user.isVerified = true;
    user.verificationToken = "";
    await user.save();
    return res.status(200).json({
      message: `Email verified successfully Welcome ${user.username}! in our educational community. (Plus2Helper)`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error  verification failed!! :- ${error.message}`,
    });
  }
};
