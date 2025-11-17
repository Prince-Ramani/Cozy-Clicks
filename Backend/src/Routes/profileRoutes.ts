import { Router } from "express";
import { protectRoute } from "../Middlewares/protectRoute";
import { getProfileInfo } from "../Controllers/profileControllers";
const router = Router();
router.get("/getProfileInfo/:profileID", protectRoute, getProfileInfo);

export default router;
