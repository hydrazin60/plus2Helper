import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          // Only run validation if email is provided
          return value
            ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
            : true;
        },
        message: "Please provide a valid email address",
      },
    },
    mobileNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Only run validation if mobileNumber is provided
          return value ? /^\d{10}$/.test(value) : true;
        },
        message: "Please provide a valid 10-digit mobile number",
      },
    },
    password: {
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
    WeekExamAttend: [
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

userSchema.path("email").validate(function (value) {
  if (!this.email && !this.mobileNumber) {
    throw new Error("At least one of email or mobile number must be provided.");
  }
}, null);

userSchema.path("mobileNumber").validate(function (value) {
  if (!this.email && !this.mobileNumber) {
    throw new Error("At least one of email or mobile number must be provided.");
  }
}, null);

const User = mongoose.model("User", userSchema);
export default User;
