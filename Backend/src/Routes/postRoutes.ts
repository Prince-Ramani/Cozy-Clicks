import { Router } from "express";
import { protectRoute } from "../Middlewares/protectRoute";
import { multerErrorHandler } from "../Middlewares/multerErrorHandler";
import {
  createPost,
  deletePost,
  editPost,
  pinUnpinPost,
} from "../Controllers/postControllers";

const router = Router();

router.post("/createPost", protectRoute, multerErrorHandler, createPost);
router.patch("/editPost/:postID", protectRoute, editPost);
router.patch("/pinUnpinPost/:postID", protectRoute, pinUnpinPost);
router.delete("/deletePost/:postID", protectRoute, deletePost);

export default router;
