import express from "express";
import {
  editLongQuestion,
  LongQuestionDelete,
  uploadLongQuestion,
} from "../../controllers/Question/LongQuestion.controller.js";
import { UploadShortQuestion } from "../../controllers/Question/ShortQuestion.controller.js";

const Admin_QuestionUploaderRouter = express.Router();

Admin_QuestionUploaderRouter.post("/longQuestion", uploadLongQuestion);
Admin_QuestionUploaderRouter.delete(
  "/deleteLongQuestion/:id",
  LongQuestionDelete
);
Admin_QuestionUploaderRouter.post("/edit/longQuestion/:id", editLongQuestion);
// MCQ
Admin_QuestionUploaderRouter.post("/MCQ_Question", UploadShortQuestion);

export default Admin_QuestionUploaderRouter;
