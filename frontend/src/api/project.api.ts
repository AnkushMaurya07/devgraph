import { apiClient } from "./client";

import type {
  ApiResponse,
  Project,
  Skill,
  Technology,
} from "../types";

export async function getProjects() {
  const response = await apiClient.get<ApiResponse<Project[]>>(
    "/projects"
  );

  return response.data.data;
}

export async function getProject(projectName: string) {
  const response = await apiClient.get<ApiResponse<Project>>(
    `/projects/${encodeURIComponent(projectName)}`
  );

  return response.data.data;
}

export async function getProjectSkills(projectName: string) {
  const response = await apiClient.get<ApiResponse<Skill[]>>(
    `/projects/${encodeURIComponent(projectName)}/skills`
  );

  return response.data.data;
}

export async function getProjectTechnologies(
  projectName: string
) {
  const response = await apiClient.get<ApiResponse<Technology[]>>(
    `/technologies/project/${encodeURIComponent(projectName)}`
  );

  return response.data.data;
}