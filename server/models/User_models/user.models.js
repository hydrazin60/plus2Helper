import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      default: null,
      match: /^\+?[0-9]{7,15}$/,
    },
    grade: {
      type: String,
      enum: ["classXI", "ClassXII", "dropper"],
      default: null,
    },
    faculty: {
      type: String,
      enum: ["Science", "managment", "commerce", "arts"],
      default: null,
    },
    optionalSubject: {
      type: String,
      enum: ["BIO", "computer ", "math", "social"],
      default: null,
    },
    collageName: {
      type: String,
      default: null,
    },
    dailyCapsule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DailyCaptule",
        index: true,
      },
    ],
    weeklyMockTest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeekelyMockTest",
      },
    ],
    saveLongQuestion: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongQuestion",
      },
    ],
    saveShortQuestion: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortQuestion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
