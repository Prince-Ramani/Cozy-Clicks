import { NextFunction, Request, Response } from "express";
import { verifyJWTToken } from "../utils/JWT";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.user;

    if (!token) {
      res.status(401).json({ error: "Token missing or invalid" });
      return;
    }

    const validToken = verifyJWTToken(token);

    if (!validToken || typeof validToken !== "string") {
      res.status(401).json({ error: "Token invalid or expired" });
      return;
    }

    req.user = validToken;
    next();
  } catch (err) {
    console.log("Error in protectRoute in protectRoute.ts file : ", err);
    res.status(500).json("Internal sever error!");
    return;
  }
};
