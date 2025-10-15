import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(413).json({ error: "File size must not exceed 20MB" });
      return;
    }
    res.status(400).json({ error: err.message });
    return;
  }

  if (err.message === "Only images are allowed") {
    res.status(400).json({ error: err.message });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};
