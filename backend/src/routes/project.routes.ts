import { Router } from "express";

import {
  getAllProjectsController,
  getProjectByNameController,
  getProjectSkillsController,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getAllProjectsController);

router.get(
  "/:projectName/skills",
  getProjectSkillsController
);

router.get(
  "/:projectName",
  getProjectByNameController
);

export default router;