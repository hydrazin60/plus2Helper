import express from "express";
import { register } from "../controllers/Auth.controllers/register.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);

export default authRouter;
