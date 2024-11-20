import mongoose from "mongoose";

const longQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true, 
    },
    answer: {
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
      type: [String],  
      default: null,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
      required: true,
    },
    level: {
      type: String,
      enum: ["classXI", "classXII", "dropper"],
      required: true,
    },
    solvingTime: {
      type: Number,
      default: null,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

longQuestionSchema.index({ subject: 1, level: 1, difficulty: 1 });

const LongQuestionModel = mongoose.model("LongQuestion", longQuestionSchema);
export default LongQuestionModel;
