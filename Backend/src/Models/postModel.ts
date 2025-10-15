import mongoose, { Types, Document, ObjectId, mongo } from "mongoose";

interface PostsDocument extends Document {
  userID: Types.ObjectId;
  image: string[];
  description?: string;
  location?: string;
  likes: Types.ObjectId[];
  categories: Types.ObjectId[];
  views: number;
  pinned?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostsDocument>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: [String],
      required: true,
      default: [],
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: [],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Posts = mongoose.model<PostsDocument>("Posts", postSchema);

export default Posts;
