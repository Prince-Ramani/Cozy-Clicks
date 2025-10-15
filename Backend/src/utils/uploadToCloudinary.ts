import cloudinary from "src/services/cloudinary";
import { Readable } from "stream";

export const uploadBufferToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "Cozy-Click/posts",
      },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result.secure_url);
      },
    );
    Readable.from(buffer).pipe(stream);
  });
};
