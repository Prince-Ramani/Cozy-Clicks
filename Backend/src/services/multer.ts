import multer from "multer";
import path from "path";
import fs from "fs";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Only images are allowed"));
    } else {
      cb(null, true);
    }
  },
});
