import { apiClient } from "./client";

import type {
  ApiResponse,
  Job,
  RecommendedProject,
  Skill,
  Technology,
} from "../types";

export async function getJobs() {
  const response = await apiClient.get<ApiResponse<Job[]>>(
    "/jobs"
  );

  return response.data.data;
}

export async function getJobTechnologies(
  jobTitle: string
) {
  const response = await apiClient.get<ApiResponse<Technology[]>>(
    `/jobs/${encodeURIComponent(jobTitle)}/technologies`
  );

  return response.data.data;
}

export async function getJobSkills(jobTitle: string) {
  const response = await apiClient.get<ApiResponse<Skill[]>>(
    `/jobs/${encodeURIComponent(jobTitle)}/skills`
  );

  return response.data.data;
}

export async function getRecommendedProjects(
  jobTitle: string
) {
  const response = await apiClient.get<
    ApiResponse<RecommendedProject[]>
  >(
    `/jobs/${encodeURIComponent(jobTitle)}/recommended-projects`
  );

  return response.data.data;
}