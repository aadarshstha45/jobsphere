import { Router } from "express";
import {
  getAllApplications,
  getCompanies,
  getCompanyById,
  getCompanyDetail,
  getCompanyJobById,
  updateCompany,
} from "../controllers/companyController";
import { requireAuth } from "../middlewares";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", getCompanies);
router.get("/me", requireAuth, getCompanyDetail);
router.get("/application", requireAuth, getAllApplications);
router.get("/:id", getCompanyById);
router.get("/job/:id", requireAuth, getCompanyJobById);
router.patch("/", upload.single("logo"), requireAuth, updateCompany);

export default router;
