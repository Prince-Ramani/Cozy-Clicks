import { Router } from "express";
import { getMe, logout, signin, signup } from "../Controllers/authControllers";
import { protectRoute } from "src/Middlewares/protectRoute";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", protectRoute, logout);
router.post("/getMe", protectRoute, getMe);

export default router;
