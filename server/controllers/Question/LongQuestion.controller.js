import LongQuestionModel from "../../models/long_question/longQuestion.models.js";
export const uploadLongQuestion = async (req, res) => {
  try {
    const {
      question,
      answer,
      marks,
      subject,
      topics,
      chapter,
      difficulty,
      level,
      solvingTime,
    } = req.body;
    if (
      !question ||
      !answer ||
      !marks ||
      !subject ||
      !topics ||
      !chapter ||
      !level
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: true,
      });
    }
    const newLongQuestion = new LongQuestionModel({
      question,
      answer,
      marks,
      subject,
      topics,
      chapter,
      difficulty,
      level,
      solvingTime,
    });

    await newLongQuestion.save();
    return res.status(200).json({
      success: true,
      message: "Long Question uploaded successfully",
      data: newLongQuestion,
    });
  } catch (error) {
    console.log(`Somthing went wrong on uploading Long Questiion ANswer ${error.message}
    }`);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const LongQuestionDelete = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
        error: true,
      });
    }
    const longQuestion = await LongQuestionModel.findByIdAndDelete(id);
    await longQuestion.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Long Question deleted successfully",
    });
  } catch (error) {
    console.log(
      `Something went wrong on deleting Long Question ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

export const editLongQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, marks, subject, topics, chapter, difficulty } =
      req.body;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        error: true,
      });
    }
    const longQuestion = await LongQuestionModel.findById(id);
    if (!longQuestion) {
      return res.status(404).json({
        success: false,
        message: "Long Question not found",
        error: true,
      });
    }

    if (question !== undefined) longQuestion.question = question;
    if (answer !== undefined) longQuestion.answer = answer;
    if (marks !== undefined) longQuestion.marks = marks;
    if (subject !== undefined) longQuestion.subject = subject;
    if (topics !== undefined) longQuestion.topics = topics;
    if (chapter !== undefined) longQuestion.chapter = chapter;
    if (difficulty !== undefined) longQuestion.difficulty = difficulty;

    await longQuestion.save();

    return res.status(200).json({
      success: true,
      message: "Long Question updated successfully",
      data: longQuestion,
    });
  } catch (error) {
    console.log(
      `Something went wrong while editing Long Question: ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};
