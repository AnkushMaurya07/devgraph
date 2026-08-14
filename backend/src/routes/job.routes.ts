import { Router } from "express";

import {
  getAllJobsController,
  getJobTechnologiesController,
  getJobSkillsController,
  getJobRecommendedProjectsController,
} from "../controllers/job.controller.js";

const router = Router();

router.get("/", getAllJobsController);

router.get(
  "/:jobTitle/recommended-projects",
  getJobRecommendedProjectsController
);

router.get(
  "/:jobTitle/technologies",
  getJobTechnologiesController
);

router.get(
  "/:jobTitle/skills",
  getJobSkillsController
);

export default router;