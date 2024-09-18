import mongoose from "mongoose";

const LongQuestionSchema = new mongoose.Schema(
  {
    grage: {
      type: String,
      enum: ["Grade 11", "Grade 12"],
      required: true,
    },
    faculty: {
      type: String,
      enum: ["Science", "Management", "Arts"],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LongQuestion = mongoose.model("LongQuestion", LongQuestionSchema);
export default LongQuestion;
