import express from "express";
import { logout } from "../controllers/user/userActivity/userActivity.controller.js";
const userActivityRouter = express.Router();
userActivityRouter.get("/logout", logout);
export default userActivityRouter;
