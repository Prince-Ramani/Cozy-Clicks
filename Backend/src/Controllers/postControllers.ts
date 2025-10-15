import { Request, Response } from "express";
import mongoose, { isValidObjectId, Types } from "mongoose";
import Posts from "src/Models/postModel";
import { CreatePostInput } from "src/Types/postTypes";
import { uploadBufferToCloudinary } from "src/utils/uploadToCloudinary";
import {
  validatePostDescription,
  validatePostlocation,
} from "src/utils/validators";

interface CreatePostPayload {
  categories: string[];
  description?: string;
  location?: string;
}

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { categories, description, location }: CreatePostPayload = req.body;
    const files = req.files as Express.Multer.File[];
    const userID = req.user as string;

    if (!userID || !isValidObjectId(userID)) {
      res.status(400).json({ error: "Unauthorized." });
      return;
    }

    if (!files || files.length === 0) {
      res
        .status(400)
        .json({ error: "Minimum one image required to create post." });
      return;
    }

    if (files.length > 10) {
      res
        .status(400)
        .json({ error: "Maximum 10 images can be uploaded at a time." });
      return;
    }

    let categoriesObjectIDs: Types.ObjectId[] = [];

    if (Array.isArray(categories) && categories.length > 0) {
      for (const str of categories) {
        const trimmed = str.trim();

        if (!isValidObjectId(trimmed)) {
          res.status(400).json({ error: `Invalid category ID: ${trimmed}` });
          return;
        }

        categoriesObjectIDs.push(new mongoose.Types.ObjectId(trimmed));
      }
    }

    if (description?.trim()) {
      const isValidDescription = validatePostDescription(description);
      if (!isValidDescription.isValid && isValidDescription.message) {
        res.status(400).json({ error: isValidDescription.message });
        return;
      }
    }

    if (location?.trim()) {
      const isValidlocation = validatePostlocation(location);
      if (!isValidlocation.isValid && isValidlocation.message) {
        res.status(400).json({ error: isValidlocation.message });
        return;
      }
    }

    const uploadResults = await Promise.all(
      files.map((f) => uploadBufferToCloudinary(f.buffer)),
    );
    const payload: CreatePostInput = {
      userID: new mongoose.Types.ObjectId(userID),
      image: uploadResults,
      categories: categoriesObjectIDs,
      location: location?.trim(),
      description: description?.trim(),
    };

    const newPost = new Posts(payload);

    await newPost.save();

    res.status(200).json({
      message: "Post uploaded successfully.",
    });
  } catch (err) {
    console.error("Error occured postControllers.ts > createPost : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
