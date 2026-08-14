import { Router } from "express";

import {
  getAllTechnologiesController,
  getProjectTechnologiesController,
  getTechnologyProjectsController,
  getTechnologyConnectionsController,
  getRelatedTechnologiesController,
} from "../controllers/technology.controller.js";

const router = Router();

router.get("/", getAllTechnologiesController);

router.get(
  "/project/:projectName",
  getProjectTechnologiesController
);

router.get(
  "/:technology/projects",
  getTechnologyProjectsController
);

router.get(
  "/:technology/connections",
  getTechnologyConnectionsController
);

router.get(
  "/:technology/related",
  getRelatedTechnologiesController
);

export default router;