import express from "express";
import {
  editLongQuestion,
  LongQuestionDelete,
  uploadLongQuestion,
} from "../../controllers/Question/LongQuestion.controller.js";

const Admin_QuestionUploaderRouter = express.Router();

Admin_QuestionUploaderRouter.post("/longQuestion", uploadLongQuestion);
Admin_QuestionUploaderRouter.delete(
  "/deleteLongQuestion/:id",
  LongQuestionDelete
);
Admin_QuestionUploaderRouter.post("/edit/longQuestion/:id", editLongQuestion);

export default Admin_QuestionUploaderRouter;
