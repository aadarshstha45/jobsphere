import { Router } from "express";

import {
  changePassword,
  dataCount,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/changePassword", requireAuth, changePassword);
router.post("/logout", requireAuth, logoutUser);
router.get("/dataCount", dataCount);

export default router;
