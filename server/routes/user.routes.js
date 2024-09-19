import express from "express";
import { Register, VerifyEmail } from "../controllers/user.controller.js";
const userRoutes = express.Router();

userRoutes.post("/register", Register);
userRoutes.get("/verify/:verificationToken", VerifyEmail);

export default userRoutes;
