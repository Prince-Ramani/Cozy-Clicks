import { error } from "console";
import { Request, Response } from "express";
import mongoose, { isValidObjectId, Types } from "mongoose";
import Posts from "../Models/postModel";
import User from "../Models/userModel";
import cloudinary from "../services/cloudinary";
import { CreatePostInput } from "../Types/postTypes";
import {
  uploadBufferToCloudinary,
  getCloudinaryPostID,
} from "../utils/cloudinary";
import { toObjectId } from "../utils/functions";
import {
  validatePostDescription,
  validatePostlocation,
} from "../utils/validators";

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

        categoriesObjectIDs.push(toObjectId(trimmed));
      }
    }

    if (description?.trim()) {
      const isValidDescription = validatePostDescription(description);
      if (!isValidDescription.isValid) {
        res.status(400).json({ error: isValidDescription.message });
        return;
      }
    }

    if (location?.trim()) {
      const isValidlocation = validatePostlocation(location);
      if (!isValidlocation.isValid) {
        res.status(400).json({ error: isValidlocation.message });
        return;
      }
    }

    const uploadResults = await Promise.all(
      files.map((f) => uploadBufferToCloudinary(f.buffer)),
    );
    const payload: CreatePostInput = {
      userID: toObjectId(userID),
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

export const deletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const postID = req.params.postID;
    const userID = req.user;

    if (!userID) {
      res.status(400).json({ error: "Unauthorized." });
      return;
    }

    if (!postID) {
      res.status(400).json({ error: "Post ID required to delete a post." });
      return;
    }

    const user = await User.exists({ _id: userID }).exec();

    if (!user) {
      res.status(400).json({ error: "Unauthorized." });
      return;
    }

    const post = await Posts.findOne({ userID, _id: postID }).lean().exec();

    if (!post) {
      res.status(404).json({ error: "No such post found" });
      return;
    }

    if (post.image && post.image.length > 0) {
      const imageIDs = post.image.map((link) => {
        return getCloudinaryPostID(link);
      });

      await cloudinary.api.delete_resources(imageIDs);
    }

    await Posts.deleteOne({ _id: postID });

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    console.error("Error occured postControllers.ts > deletePost : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const pinUnpinPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const postID = req.params.postID;
    const userID = req.user;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }
    if (!postID) {
      res.status(400).json({ error: "Post ID required to pin/unpin a post." });
      return;
    }

    const user = await User.exists({ _id: userID }).exec();

    if (!user) {
      res.status(400).json({ error: "Unauthorized." });
      return;
    }

    const post = await Posts.findOne({ userID, _id: postID }).exec();

    if (!post) {
      res.status(404).json({ error: "No such post found" });
      return;
    }

    post.pinned = !post.pinned;
    await post.save({});

    res.status(200).json({
      message: `Post ${post.pinned ? "Pinned" : "Unpinned"} successfully.`,
    });
  } catch (err) {
    console.error("Error occured postControllers.ts > pinUnpinPost : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postID = req.params.postID;
    const userID = req.user;
    const {
      categories,
      description,
      location,
    }: {
      categories: string[];
      description?: string;
      location?: string;
    } = req.body;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }

    if (!postID) {
      res.status(400).json({ error: "Post ID required to edit a post." });
      return;
    }

    const user = await User.exists({ _id: userID }).exec();

    if (!user) {
      res.status(400).json({ error: "Unauthorized." });
      return;
    }

    const post = await Posts.findOne({ userID, _id: postID }).exec();

    if (!post) {
      res.status(404).json({ error: "No such post found" });
      return;
    }

    if (Array.isArray(categories) && categories.length > 0) {
      const newCategories: Types.ObjectId[] = [];
      for (const str of categories) {
        const trimmed = str.trim();

        if (!isValidObjectId(trimmed)) {
          res.status(400).json({ error: `Invalid category ID: ${trimmed}` });
          return;
        }
        newCategories.push(toObjectId(trimmed));
      }

      post.categories = newCategories;
    }

    if (description?.trim()) {
      const isValidDescription = validatePostDescription(description);
      if (!isValidDescription.isValid) {
        res.status(400).json({ error: isValidDescription.message });
        return;
      }
      post.description = description;
    }

    if (location?.trim()) {
      const isValidlocation = validatePostlocation(location);
      if (!isValidlocation.isValid) {
        res.status(400).json({ error: isValidlocation.message });
        return;
      }
      post.location = location;
    }

    await post.save();

    res.status(200).json({ message: "Post edited successfully." });
  } catch (err) {
    console.error("Error occured postControllers.ts > editPost : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
