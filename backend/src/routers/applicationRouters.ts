import { Router } from "express";
import {
  createApplication,
  doesApplicationExist,
  getApplicationDetails,
  getApplicationHistory,
  getApplications,
  getApplicationsByJobId,
  getMeetings,
  getRecentApplied,
  getShortListedApplications,
  updateApplication,
} from "../controllers/applicationController";
import { requireAuth } from "../middlewares";

const router = Router();

router.use(requireAuth);

router.post("/", createApplication);
router.post("/status", doesApplicationExist);

router.get("/", getApplications);
router.get("/meetings", getMeetings);
router.get("/shortlisted", getShortListedApplications);
router.get("/recent", getRecentApplied);
router.get("/history", getApplicationHistory);

router.get("/:id", getApplicationDetails);
router.patch("/:id", updateApplication);
router.get("/job/:id", getApplicationsByJobId);

export default router;
