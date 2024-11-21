import UserModel from "../../models/User_models/user.models.js";
import bcrypt from "bcrypt";
import validator from "validator";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileNumberRegex = /^\+?[0-9]{10}$/;

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

    const userData = user.toObject();
    delete userData.password;
    return res.status(201).json({
      success: true,
      message: `${user.fullName} successfully registered! please go to Login page `,
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
