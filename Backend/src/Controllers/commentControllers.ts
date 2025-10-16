import { Request, Response } from "express";
import mongoose, { isValidObjectId, ObjectId, Types } from "mongoose";
import Comments from "src/Models/commentModel";
import Posts from "src/Models/postModel";
import { createCommentInput } from "src/Types/postTypes";
import { toObjectId } from "src/utils/functions";

export const addComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      text,
      parentComment,
      postID,
    }: {
      text: string | undefined;
      postID: string | undefined;
      parentComment?: string;
    } = req.body;

    const userID = req.user;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }

    if (!postID) {
      res.status(400).json({ error: "Post id required to add comment." });
      return;
    }

    if (!isValidObjectId(postID)) {
      res.status(401).json({ error: "Invalid postID" });
      return;
    }

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "Comment content required." });
      return;
    }

    if (text.trim().length > 500) {
      res.status(400).json({ error: "Comment cannot exceed 500 characters." });
      return;
    }

    const post = await Posts.findOne({ _id: postID }).exec();

    if (!post) {
      res.status(404).json({ error: "No such post found to comment." });
      return;
    }

    if (parentComment && typeof parentComment !== "undefined") {
      if (!isValidObjectId(parentComment)) {
        res.status(400).json({ error: "Invalid comment id." });
        return;
      }

      const parentCommentFound = await Comments.findOne({ _id: parentComment })
        .lean()
        .exec();

      if (!parentCommentFound) {
        res.status(404).json({ error: "No comment found to reply." });
        return;
      }

      const payload: createCommentInput = {
        parentComment: parentCommentFound._id,
        commenterID: toObjectId(userID),
        text,
        postID: parentCommentFound.postID as Types.ObjectId,
      };

      const newReply = new Comments(payload);
      await newReply.save();

      await Comments.findByIdAndUpdate(parentComment, {
        $push: { replies: newReply._id },
      });

      res.status(200).json({ message: "Comment replied successfully." });
      return;
    }

    const payload: createCommentInput = {
      commenterID: toObjectId(userID),
      postID: toObjectId(postID),
      text,
    };

    const newComment = new Comments(payload);

    await newComment.save();

    res.status(200).json({ message: "Comment added successfully." });

    return;
  } catch (err) {
    console.error("Error occured commentControllers.ts > addComment : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const commentID: string = req.params.commentID;
    const userID = req.user;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }

    if (!commentID) {
      res
        .status(400)
        .json({ error: "Comment id required to delete a comment." });
      return;
    }

    const commentToDelete = await Comments.findById(commentID)
      .populate({
        path: "postID",
        select: "userID",
      })
      .lean()
      .exec();

    if (!commentToDelete) {
      res.status(404).json({ error: "No such comment found." });
      return;
    }

    if (
      typeof commentToDelete.postID === "object" &&
      commentToDelete.postID !== null &&
      "userID" in commentToDelete.postID
    ) {
      const isDeletable =
        commentToDelete.commenterID.toString() === userID ||
        commentToDelete.postID.userID.toString() === userID;

      if (isDeletable && commentToDelete.parentComment !== null) {
        //removing comment from replied if has parentComment
        await Comments.updateOne(
          { _id: commentToDelete.parentComment },
          { $pull: { replies: commentToDelete._id } },
        );
      }

      await Comments.deleteOne({ _id: commentToDelete._id });
      res.status(200).json({ message: "Comment deleted successfully." });
    } else {
      res.status(404).json({ error: "No post owner found." });
      return;
    }
  } catch (err) {
    console.error("Error occured commentControllers.ts > deleteComment: ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const editComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      text,
      commentID,
    }: {
      text: string | undefined;
      commentID: string | undefined;
    } = req.body;

    const userID = req.user;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }

    if (!commentID) {
      res.status(400).json({ error: "Comment id required to edit comment." });
      return;
    }

    if (!isValidObjectId(commentID)) {
      res.status(401).json({ error: "Invalid comment id." });
      return;
    }

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "Comment content required." });
      return;
    }

    if (text.trim().length > 500) {
      res.status(400).json({ error: "Comment cannot exceed 500 characters." });
      return;
    }

    const comment = await Comments.findById(commentID).exec();

    if (!comment) {
      res.status(404).json({ error: "no such comment found." });
      return;
    }

    if (comment.commenterID.toString() !== userID) {
      res.status(400).json({ error: "Only commenter can edit a comment." });
      return;
    }

    comment.text = text;
    await comment.save();

    await res.status(200).json({ message: "Comment edited successfully." });
    return;
  } catch (err) {
    console.error("Error occured commentControllers.ts > editComment : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const likeUnlikeComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const commentID: string | undefined = req.params.commentID;

    let userID: string | Types.ObjectId | undefined = req.user;

    if (!userID) {
      res.status(401).json({ error: "Unauthorized." });
      return;
    }

    userID = toObjectId(userID);

    if (!commentID) {
      res.status(400).json({ error: "Comment id required to like a comment." });
      return;
    }

    if (!isValidObjectId(commentID)) {
      res.status(401).json({ error: "Invalid comment id." });
      return;
    }

    const comment = await Comments.findById(commentID).exec();

    if (!comment) {
      res.status(404).json({ error: "No such comment found." });
      return;
    }

    const likes = comment.likes as Types.ObjectId[];
    const isLiked = likes.some((id) => id.equals(userID));

    if (isLiked) {
      comment.likes = likes.filter((id) => !id.equals(userID));
    } else {
      likes.push(userID);
      comment.likes = likes;
    }

    await comment.save();

    res.status(200).json({
      message: `Comment ${isLiked ? "unliked" : "liked"} successfully.`,
    });

    return;
  } catch (err) {
    console.error(
      "Error occured commentControllers.ts > likeUnlikeComment : ",
      err,
    );
    res.status(500).json({ error: "Internal server error." });
  }
};
