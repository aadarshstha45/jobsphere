import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getCompanyJobs,
  getJobById,
  getRecentJobs,
  getRelatedJobs,
  updateJob,
  updateJobStatus,
} from "../controllers/jobController";
import { optionalAuth, requireAuth } from "../middlewares";

const router = Router();

router.post("/", requireAuth, createJob);
router.get("/company", requireAuth, getCompanyJobs);
router.get("/", optionalAuth, getAllJobs);
router.get("/recent", requireAuth, getRecentJobs);
router.get("/related/:id", getRelatedJobs);
router.get("/:id", optionalAuth, getJobById);
router.patch("/:id", requireAuth, updateJob);
router.patch("/status/:id", requireAuth, updateJobStatus);
router.delete("/:id", requireAuth, deleteJob);

export default router;
