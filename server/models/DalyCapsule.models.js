import mongoose from "mongoose";

const DalyCapsuleSchema = new mongoose.Schema(
  {
    grage: {
      type: String,
      enum: ["Grade 11", "Grade 12", "Entrance"],
      required: true,
    },
    Question: [
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
  },
  { timestamps: true }
);

const DalyCapsule = mongoose.model("DalyCapsule", DalyCapsuleSchema);

export default DalyCapsule;
