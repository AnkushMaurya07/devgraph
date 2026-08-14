import { Request, Response } from "express";
import { getParam } from "../utils/params.js";

import {
  getAllProjects,
  getProjectByName,
  getProjectSkills,
} from "../services/project.service.js";

export async function getAllProjectsController(
  _req: Request,
  res: Response
) {
  const projects = await getAllProjects();

  res.status(200).json({
    data: projects,
  });
}

export async function getProjectByNameController(
  req: Request,
  res: Response
) {
  const projectName = getParam(req.params.projectName);

  if (!projectName) {
    return res.status(400).json({
      error: "Project name is required",
    });
  }

  const project = await getProjectByName(projectName);

  if (!project) {
    return res.status(404).json({
      error: "Project not found",
    });
  }

  res.status(200).json({
    data: project,
  });
}

export async function getProjectSkillsController(
  req: Request,
  res: Response
) {
  const projectName = getParam(req.params.projectName);

  if (!projectName) {
    return res.status(400).json({
      error: "Project name is required",
    });
  }

  const skills = await getProjectSkills(projectName);

  res.status(200).json({
    data: skills,
  });
}