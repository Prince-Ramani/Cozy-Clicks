import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import User from "../Models/userModel";
export const getProfileInfo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userID = req.user;
    const profileID = req.params.profileID;

    if (!userID) {
      res.status(400).json({ error: "Unauthorized" });
      return;
    }

    if (!profileID || !isValidObjectId(profileID)) {
      res.status(400).json({
        error: "Valid profileID required to get profile information.",
      });
      return;
    }

    const info = await User.findById(profileID)
      .select("-password -createdAt -updatedAt")
      .lean()
      .exec();

    if (!info) {
      res.status(400).json({ error: "No info/user found!" });
      return;
    }

    const followers = info.followers.length;

    const following = info.followers.length;

    res.status(200).json({ ...info, followers, following });
    return;
  } catch (err) {
    console.error("Error occured authController.ts > getUserInfo : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
