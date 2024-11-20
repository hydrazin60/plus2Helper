import mongoose from "mongoose";

const shortQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      enum: ["OptionA", "OptionB", "OptionC", "OptionD"],
      required: true,
    },
    optionA: {
      type: String,
      required: true,
    },
    optionB: {
      type: String,
      required: true,
    },
    optionC: {
      type: String,
      required: true,
    },
    optionD: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
    },
    subject: {
      type: String,
      enum: ["Science", "management", "commerce", "arts"],
      required: true,
    },
    topics: {
      type: [String],
      default: null,
    },
    chapter: {
      type: String,
      default: null,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

shortQuestionSchema.index({ subject: 1, difficulty: 1 });

const ShortQuestionModel = mongoose.model("ShortQuestion", shortQuestionSchema);
export default ShortQuestionModel;
