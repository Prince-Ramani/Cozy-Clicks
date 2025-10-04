import mongoose, { Types, Document, ObjectId } from "mongoose";

interface UserInterface extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  profileBanner: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    profileBanner: {
      type: String,
      required: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
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

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
