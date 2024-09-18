import mongoose from "mongoose";
const MCQQuestionSchema = new mongoose.Schema(
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
    question: {
      type: String,
      required: true,
    },
    option1: {
      type: String,
      required: true,
    },
    option2: {
      type: String,
      required: true,
    },
    option3: {
      type: String,
      required: true,
    },
    option4: {
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

const MCQQuestion = mongoose.model("MCQQuestion", MCQQuestionSchema);

export default MCQQuestion;
