import { Router } from "express";

import {
  getAllResourcesController,
  getResourcesForTechnologyController,
} from "../controllers/resource.controller.js";

const router = Router();

router.get("/", getAllResourcesController);

router.get(
  "/technology/:technology",
  getResourcesForTechnologyController
);

export default router;