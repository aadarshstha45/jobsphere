import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  getResumeById,
  updateResume,
} from "../controllers/resumeController";
import { requireAuth } from "../middlewares";
import { upload } from "../utils/multer";

const router = Router();

router.post("/", requireAuth, upload.single("resume"), createResume);
router.get("/", requireAuth, getResume);
router.get("/:id", requireAuth, getResumeById);
router.patch("/:id", requireAuth, upload.single("resume"), updateResume);
router.delete("/:id", requireAuth, deleteResume);

export default router;
