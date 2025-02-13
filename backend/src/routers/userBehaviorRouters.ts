import { Router } from "express";
import { createUserBehavior } from "../controllers/userBehaviorController";
import { optionalAuth } from "../middlewares";

const router = Router();

router.post("/", optionalAuth, createUserBehavior);

export default router;
