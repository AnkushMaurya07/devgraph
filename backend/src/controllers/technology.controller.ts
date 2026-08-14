import { Request, Response } from "express";
import { getParam } from "../utils/params.js";

import {
  getAllTechnologies,
  getProjectTechnologies,
  getTechnologyProjects,
  getTechnologyConnections,
  getRelatedTechnologies,
} from "../services/technology.service.js";

export async function getAllTechnologiesController(
  _req: Request,
  res: Response
) {
  const technologies = await getAllTechnologies();

  res.status(200).json({
    data: technologies,
  });
}

export async function getProjectTechnologiesController(
  req: Request,
  res: Response
) {
  const projectName = getParam(req.params.projectName);

  if (!projectName) {
    return res.status(400).json({
      error: "Project name is required",
    });
  }

  const technologies = await getProjectTechnologies(projectName);

  res.status(200).json({
    data: technologies,
  });
}

export async function getTechnologyProjectsController(
  req: Request,
  res: Response
) {
  const technology = getParam(req.params.technology);

  if (!technology) {
    return res.status(400).json({
      error: "Technology is required",
    });
  }

  const projects = await getTechnologyProjects(technology);

  res.status(200).json({
    data: projects,
  });
}

export async function getTechnologyConnectionsController(
  req: Request,
  res: Response
) {
  const technology = getParam(req.params.technology);

  if (!technology) {
    return res.status(400).json({
      error: "Technology is required",
    });
  }

  const connections = await getTechnologyConnections(technology);

  res.status(200).json({
    data: connections,
  });
}

export async function getRelatedTechnologiesController(
  req: Request,
  res: Response
) {
  const technology = getParam(req.params.technology);

  if (!technology) {
    return res.status(400).json({
      error: "Technology is required",
    });
  }

  const relatedTechnologies = await getRelatedTechnologies(technology);

  res.status(200).json({
    data: relatedTechnologies,
  });
}