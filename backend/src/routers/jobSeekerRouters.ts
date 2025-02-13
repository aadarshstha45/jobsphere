import { Router } from "express";

import {
  getJobseekerStats,
  getUser,
  updateJobseeker,
} from "../controllers/jobseekerController";
import { requireAuth } from "../middlewares";
import { upload } from "../utils/multer";

const router = Router();

router.patch(
  "/update",
  requireAuth,
  upload.single("profilePicture"),
  updateJobseeker
);
router.get("/me", requireAuth, getUser);
router.get("/stats", requireAuth, getJobseekerStats);

export default router;
