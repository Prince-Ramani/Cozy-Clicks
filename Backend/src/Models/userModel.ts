import mongoose, { Types, Document, ObjectId } from "mongoose";

interface LinksInterface {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  profileBanner: string;
  followers: Types.ObjectId[] | UserDocument[];
  following: Types.ObjectId[] | UserDocument[];
  links: LinksInterface;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
      default:
        "https://res.cloudinary.com/dwxzguawt/image/upload/v1757559976/profile_xbn7gy.png",
    },
    profileBanner: {
      type: String,
      default:
        "https://res.cloudinary.com/dwxzguawt/image/upload/v1757559976/profile_xbn7gy.png",
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
    links: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
      twitter: { type: String, default: "" },
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

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
