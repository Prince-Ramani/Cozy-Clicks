import cloudinary from "src/services/cloudinary";
import { Readable } from "stream";

const POSTS_FOLDER = "Cozy-Clicks/posts";

export const uploadBufferToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: POSTS_FOLDER,
      },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result.secure_url);
      },
    );
    Readable.from(buffer).pipe(stream);
  });
};

export const getCloudinaryPostID = (link: string): string => {
  const imgID = link.split("/").slice(-1)[0].split(".")[0];
  return `${POSTS_FOLDER}/${imgID}`;
};
