import UserModel from "../../models/User_models/user.models.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
