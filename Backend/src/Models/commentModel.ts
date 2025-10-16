import mongoose, { Types } from "mongoose";
import { UserDocument } from "./userModel";
import { PostsDocument } from "./postModel";

interface CommentsDocument {
  _id: Types.ObjectId;
  postID: Types.ObjectId | PostsDocument;
  commenterID: Types.ObjectId | UserDocument;
  text: string;
  parentComment?: Types.ObjectId;
  replies: Types.ObjectId[] | UserDocument[];
  likes: Types.ObjectId[] | UserDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentsSchema = new mongoose.Schema<CommentsDocument>(
  {
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    commenterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
      default: [],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      required: false,
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Comments = mongoose.model<CommentsDocument>("Comments", CommentsSchema);

export default Comments;
