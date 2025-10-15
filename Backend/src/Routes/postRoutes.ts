import { Router } from "express";
import { protectRoute } from "../Middlewares/protectRoute";
import { multerErrorHandler } from "src/Middlewares/multerErrorHandler";
import { createPost } from "src/Controllers/postControllers";

const router = Router();

router.post("/createPost", protectRoute, multerErrorHandler, createPost);
