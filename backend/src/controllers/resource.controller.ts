import { Request, Response } from "express";
import { getParam } from "../utils/params.js";

import {
  getAllResources,
  getResourcesForTechnology,
} from "../services/resource.service.js";

export async function getAllResourcesController(
  _req: Request,
  res: Response
) {
  const resources = await getAllResources();

  res.status(200).json({
    data: resources,
  });
}

export async function getResourcesForTechnologyController(
  req: Request,
  res: Response
) {
  const technology = getParam(req.params.technology);

  if (!technology) {
    return res.status(400).json({
      error: "Technology is required",
    });
  }

  const resources = await getResourcesForTechnology(technology);

  res.status(200).json({
    data: resources,
  });
}