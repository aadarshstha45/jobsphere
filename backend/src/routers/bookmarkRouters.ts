import { Router } from "express";

import {
  bookMarkJobs,
  getBookMarkedJobs,
  getSavedJobs,
} from "../controllers/bookmarkController";
import { requireAuth } from "../middlewares";

const router = Router();

router.post("/jobs", requireAuth, bookMarkJobs);
router.get("/jobs", requireAuth, getBookMarkedJobs);
router.get("/saved", requireAuth, getSavedJobs);

export default router;
