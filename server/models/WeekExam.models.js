import mongoose from "mongoose";

const WeekExamSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      enum: ["IOE", "CEE", "Cmath", "BSc_CSIT", "BIT"],
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MCQQuestion",
      },
    ],
    studentId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    fullMark: {
      type: Number,
      required: true,
    },
    MarksObtained: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const WeekExam = mongoose.model("WeekExam", WeekExamSchema);
export default WeekExam;
