import { Router } from "express";
import { protectRoute } from "../Middlewares/protectRoute";
import {
  addComment,
  deleteComment,
  editComment,
  likeUnlikeComment,
  pinUnpinComment,
} from "../Controllers/commentControllers";

const router = Router();

router.post("/addComment", protectRoute, addComment);
router.delete("/deleteComment/:commentID", protectRoute, deleteComment);
router.patch("/editComment", protectRoute, editComment);
router.patch("/likeComment/:commentID", protectRoute, likeUnlikeComment);
router.patch("/pinUnpinComment/:commentID", protectRoute, pinUnpinComment);

export default router;
