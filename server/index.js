import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const POST = process.env.PORT;

app.use(express.json());

app.use("/plus2Helper/api/v1/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((error) =>
    console.log("Database not connected! database error: ", error)
  );

app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});
