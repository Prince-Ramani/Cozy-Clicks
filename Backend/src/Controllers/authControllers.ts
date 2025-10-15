import { Request, Response } from "express";
import {
  validateUsername,
  validateEmailFormmate,
  validatePasswordStrenght,
} from "../utils/validators";
import User from "../Models/userModel";
import { hashPassword, matchPassword } from "../utils/password";
import { createJWTToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      email,
      password,
    }: {
      username: string | undefined;
      email: string | undefined;
      password: string | undefined;
    } = req.body;

    if (!username) {
      res.status(400).json({ error: "Username required." });
      return;
    }

    if (!email) {
      res.status(400).json({ error: "Email required." });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "password required." });
      return;
    }

    const isValidUsername = validateUsername(username);

    if (!isValidUsername.isValid && isValidUsername.message) {
      res.status(400).json({ error: isValidUsername.message });
      return;
    }

    const usernameAlreadyTaken = await User.exists({ username });

    if (usernameAlreadyTaken) {
      res
        .status(409)
        .json({ error: "Username already taken. Please choose another one." });
      return;
    }

    const isValidEmailFormatte = validateEmailFormmate(email);
    if (!isValidEmailFormatte.isValid && isValidEmailFormatte.message) {
      res.status(400).json({ error: isValidEmailFormatte.message });
      return;
    }

    const emailAlreadyTaken = await User.exists({ email });

    if (emailAlreadyTaken) {
      res.status(409).json({
        error: "Account with this email already exists. Try signing.",
      });
      return;
    }

    const passwordStrenght = validatePasswordStrenght(password);
    if (!passwordStrenght.isValid && passwordStrenght.message) {
      res.status(400).json({ error: passwordStrenght.message });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = createJWTToken(newUser._id.toString());

    res.cookie("user", token, { maxAge: 1000 * 60 * 24 * 30 });
    res.status(201).json({ message: "Account created successfully." });
    return;
  } catch (err) {
    console.error("Error occured authController.ts > signup : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

import { error } from "console";
export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      email,
      password,
    }: {
      email: string | undefined;
      password: string | undefined;
    } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email required." });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "password required." });
      return;
    }

    const isValidEmailFormatte = validateEmailFormmate(email);
    if (!isValidEmailFormatte.isValid && isValidEmailFormatte.message) {
      res.status(400).json({ error: isValidEmailFormatte.message });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        error: "Account with this email doesn't exists.",
      });
      return;
    }

    const passworCorrect = await matchPassword(password, user.password);

    if (!passworCorrect) {
      res.status(400).json({
        error: "Incorrect password",
      });
      return;
    }

    const token = createJWTToken(user._id.toString());
    res.cookie("user", token, { maxAge: 1000 * 60 * 24 * 30 });

    res.status(200).json({ message: "Logged in successfully." });
    return;
  } catch (err) {
    console.error("Error occured authController.ts > signin : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("user");
    res.status(200).json({ message: "Loggedout successfully." });
    return;
  } catch (err) {
    console.error("Error occured authController.ts > logout : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = req.user;

    if (!userID) {
      res.status(400).json({ error: "Unauthorized" });
      return;
    }

    const person = await User.findById(userID)
      .select("_id username email profilePicture")
      .lean();

    if (!person) {
      res.status(400).json({ error: "No user found!" });
      return;
    }

    res.status(200).json(person);
    return;
  } catch (err) {
    console.error("Error occured authController.ts > getMe : ", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
