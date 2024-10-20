import express from "express";
import { Register } from "../controllers/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/register", Register);
export default userRoutes;
