import multer from "multer";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const uploadeImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const allowFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowFileTypes.includes(file.mimetype)) {
      cd(null, true);
    } else {
      new Error(
        " Invalid file type. Only JPEG, PNG, and JPG files are allowed."
      );
      false;
    }
  },
});

const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB
const uploadPDF = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_PDF_SIZE },
  fileFilter: (req, file, cb) => {
    const allowFileTypes = ["application/pdf"];
    if (allowFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      new Error("Invalid file type. Only PDF files are allowed.");
      false;
    }
  },
});
