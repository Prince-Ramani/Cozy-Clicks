import mongoose, { Types, Document, ObjectId, mongo } from "mongoose";

interface PostSchemaInterface extends Document {
  _id: ObjectId;
  userID: ObjectId;
  image: string[];
  description?: string;
  location?: string;
  likes: ObjectId[];
  categories: ObjectId[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostSchemaInterface>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
      ref: "Users",
      default: [],
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      default: [],
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

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
