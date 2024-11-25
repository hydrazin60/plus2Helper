import express from "express";
import {
  login,
  register,
  verifyUser,
} from "../controllers/user/Auth.controllers/register.controller.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify/:token", verifyUser);

export default authRouter;
