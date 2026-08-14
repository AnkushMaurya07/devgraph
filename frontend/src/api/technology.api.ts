import { apiClient } from "./client";

import type {
  ApiResponse,
  Project,
  RelatedTechnology,
  Technology,
  Resource,
} from "../types";

export async function getTechnologies() {
  const response = await apiClient.get<ApiResponse<Technology[]>>(
    "/technologies"
  );

  return response.data.data;
}

export async function getTechnologyProjects(
  technology: string
) {
  const response = await apiClient.get<ApiResponse<Project[]>>(
    `/technologies/${encodeURIComponent(technology)}/projects`
  );

  return response.data.data;
}

export async function getRelatedTechnologies(
  technology: string
) {
  const response = await apiClient.get<
    ApiResponse<RelatedTechnology[]>
  >(
    `/technologies/${encodeURIComponent(technology)}/related`
  );

  return response.data.data;
}

export async function getTechnologyResources(
  technology: string
) {
  const response = await apiClient.get<ApiResponse<Resource[]>>(
    `/resources/technology/${encodeURIComponent(technology)}`
  );

  return response.data.data;
}