import path from "path";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { CONNECT_MONGO } from "./connection";

import AuthRouter from "./Routes/authRoutes";
import PostRouter from "./Routes/postRoutes";
import CommentRouter from "./Routes/commentRoutes";
import ProfileRouter from "./Routes/profileRoutes";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 8000;

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRouter);
app.use("/api/post/comment", CommentRouter);
app.use("/api/profile", ProfileRouter);

app.get("*", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(404).json("No such API found.");
});

app.listen(PORT, () => {
  CONNECT_MONGO();
  console.log("App listening on PORT : ", PORT);
});
