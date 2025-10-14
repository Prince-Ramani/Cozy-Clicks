import { Router } from "express";
import { getMe, logout, signin, signup } from "../Controllers/authControllers";
import { protectRoute } from "../Middlewares/protectRoute";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", protectRoute, logout);
router.get("/getMe", protectRoute, getMe);

export default router;
