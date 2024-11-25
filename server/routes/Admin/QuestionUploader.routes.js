import express from "express";
import {
  LongQuestionDelete,
  uploadLongQuestion,
} from "../../controllers/Question/LongQuestion.controller.js";

const Admin_QuestionUploaderRouter = express.Router();

Admin_QuestionUploaderRouter.post("/longQuestion", uploadLongQuestion);
Admin_QuestionUploaderRouter.delete(
  "/deleteLongQuestion/:id",
  LongQuestionDelete
);

export default Admin_QuestionUploaderRouter;
