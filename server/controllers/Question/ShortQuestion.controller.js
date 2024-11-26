import ShortQuestionModel from "../../models/short_question/shortQuestion";

export const UploadShortQuestion = async (req, res) => {
  try {
    const {
      question,
      answer,
      optionA,
      optionB,
      optionC,
      optionD,
      marks,
      subject,
      topics,
      chapter,
      difficulty,
    } = req.body;
    if (
      !question ||
      !answer ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !marks ||
      !subject
    ) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
        error: error.message,
      });
    }
    const newMCQ_SHortQuestion = await ShortQuestionModel({
      question,
      answer,
      optionA,
      optionB,
      optionC,
      optionD,
      marks,
      subject,
      topics,
      chapter,
      difficulty,
    });
    await newMCQ_SHortQuestion.save();
    return res.status(200).json({
      message: "MCQ question Answer Upload sucessfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(
      `Somthing went wrong on uploading  SHort Question Questiion ANswer ${error.message}`
    );
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong on uploading Long Questiion ANswer",
      error: true,
    });
  }
};
