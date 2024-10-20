import express from "express";
import { Register, verifyEmail } from "../controllers/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/register", Register);
userRoutes.get("/email/verify/:verificationToken", verifyEmail);
export default userRoutes;
