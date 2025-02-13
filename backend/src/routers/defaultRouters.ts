import { Router } from "express";
import {
  getCategories,
  getCategoriesForHome,
  getCompaniesForHome,
  getIndustries,
  getJobsForHome,
} from "../controllers/defaultController";

const router = Router();

router.get("/category", getCategories);
router.get("/categoryForHome", getCategoriesForHome);
router.get("/companiesForHome", getCompaniesForHome);
router.get("/jobsForHome", getJobsForHome);
router.get("/industry", getIndustries);

export default router;
