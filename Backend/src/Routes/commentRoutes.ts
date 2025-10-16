import { Router } from "express";
import { protectRoute } from "../Middlewares/protectRoute";
import {
  addComment,
  deleteComment,
  editComment,
  likeUnlikeComment,
} from "src/Controllers/commentControllers";

const router = Router();

router.post("/addComment", protectRoute, addComment);
router.delete("/deleteComment/:commentID", protectRoute, deleteComment);
router.patch("/editComment", protectRoute, editComment);
router.patch("/likeComment/:commentID", protectRoute, likeUnlikeComment);

export default router;
