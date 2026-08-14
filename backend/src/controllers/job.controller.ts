import { Request, Response } from "express";
import { getParam } from "../utils/params.js";
import {
  getAllJobs,
  getJobTechnologies,
  getJobSkills,
  getJobRecommendedProjects,
} from "../services/job.service.js";

export async function getAllJobsController(
  _req: Request,
  res: Response
) {
  const jobs = await getAllJobs();

  res.status(200).json({
    data: jobs,
  });
}

export async function getJobTechnologiesController(
  req: Request,
  res: Response
) {
  const jobTitle = getParam(req.params.jobTitle);

  if (!jobTitle) {
    return res.status(400).json({
      error: "Job title is required",
    });
  }

  const technologies = await getJobTechnologies(jobTitle);

  res.status(200).json({
    data: technologies,
  });
}

export async function getJobSkillsController(
  req: Request,
  res: Response
) {
  const jobTitle = getParam(req.params.jobTitle);

  if (!jobTitle) {
    return res.status(400).json({
      error: "Job title is required",
    });
  }

  const skills = await getJobSkills(jobTitle);

  res.status(200).json({
    data: skills,
  });
}

export async function getJobRecommendedProjectsController(
  req: Request,
  res: Response
) {
  const jobTitle = getParam(req.params.jobTitle);

  if (!jobTitle) {
    return res.status(400).json({
      error: "Job title is required",
    });
  }

  const projects = await getJobRecommendedProjects(jobTitle);

  res.status(200).json({
    data: projects,
  });
}   