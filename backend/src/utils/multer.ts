import fs from "fs";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/files"; // Default path
    if (file.fieldname === "logo") {
      uploadPath = "uploads/logo";
    } else if (file.fieldname === "images") {
      uploadPath = "uploads/images";
    } else if (file.fieldname === "profilePicture") {
      uploadPath = "uploads/profilePicture";
    } else if (file.fieldname === "resume") {
      uploadPath = "uploads/resume";
    }

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export { upload };
