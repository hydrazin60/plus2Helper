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
