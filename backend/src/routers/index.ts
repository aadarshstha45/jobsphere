import { Router } from "express";
import algoRoutes from "../algo";
import applicationRouters from "./applicationRouters";
import bookmarkRouters from "./bookmarkRouters";
import companyRouters from "./companyRouters";
import defaultRouters from "./defaultRouters";
import jobRouters from "./jobRouters";
import jobSeekerRouters from "./jobSeekerRouters";
import resumeRouters from "./resumeRouters";
import userBehaviorRouters from "./userBehaviorRouters";
import userRouters from "./userRouters";
const router = Router();

router.use("/company", companyRouters);
router.use("/", userRouters);
router.use("/", algoRoutes);
router.use("/job", jobRouters);
router.use("/bookmark", bookmarkRouters);
router.use("/jobseeker", jobSeekerRouters);
router.use("/userBehavior", userBehaviorRouters);
router.use("/resume", resumeRouters);
router.use("/application", applicationRouters);
router.use("/", defaultRouters);

export default router;
