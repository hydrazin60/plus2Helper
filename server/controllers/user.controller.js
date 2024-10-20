import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import Crypto from "crypto";
import  dotenv  from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
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

    if (!mobileNumber) {
      const existingUserWithemail = await User.findOne({ email });
      if (existingUserWithemail) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "You are already registered! Please login.",
        });
      }
    }

    if (!email) {
      const existingUserWithMobile = await User.findOne({ mobileNumber });
      if (existingUserWithMobile) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "You are already registered! Please login.",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    user.verificationToken = Crypto.randomBytes(20).toString("hex");
    await user.save();
    sendverificationEmail(user.email, user.verificationToken);
    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({
      success: true,
      error: false,
      message: ` ${username} you are registered successfully! please check your email for verification.`,
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

 
const sendverificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,  // The sender's email address
      to: email,  // The recipient's email address
      subject: "Please verify your email",
      text: `Please click the following link to verify your email: http://localhost:4000/plus2Helper/api/v1/users/email/verify/${verificationToken}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.log(`Error sending the email verification: ${error.message}`);
    }
  };
  

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.verificationToken;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Invalid verification token! Please try again.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: ` Email verification failed: ${error.message}`,
    });
  }
};
