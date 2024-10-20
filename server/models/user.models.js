import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    grade: {
      type: String,
      enum: ["Grade 11", "Grade 12", "Repeater"],
      default: "Grade 11",
    },
    faculty: {
      type: String,
      enum: ["Science", "Management", "Arts"],
      default: "Science",
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "teacher"],
      default: "user",
    },
    MCQBookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MCQQuestion",
      },
    ],
    LongQuestionBookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LongQuestion",
      },
    ],
    WeekExamAttend:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeekExam",
      },
    ],
    DalyCapsuleAttend: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DalyCapsule",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
