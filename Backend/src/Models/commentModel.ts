import mongoose, { Types } from "mongoose";

interface CommentsDocument {
  postID: Types.ObjectId;
  commenterID: Types.ObjectId;
  text: string;
  parentComment?: Types.ObjectId;
  replies: Types.ObjectId[];
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CommentsScheme = new mongoose.Schema<CommentsDocument>(
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

const Comments = mongoose.model<CommentsDocument>("Comments", CommentsScheme);

export default Comments;
