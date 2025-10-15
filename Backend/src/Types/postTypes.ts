import { Types } from "mongoose";

export type CreatePostInput = {
  userID: Types.ObjectId;
  image: string[];
  description?: string;
  location?: string;
  likes?: Types.ObjectId[];
  categories?: Types.ObjectId[];
};
