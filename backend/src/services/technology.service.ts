import { createSession } from "../db/session.js";

import {
  GET_ALL_TECHNOLOGIES,
  GET_PROJECT_TECHNOLOGIES,
  GET_TECHNOLOGY_PROJECTS,
} from "../queries/technology.queries.js";

import {
  GET_TECHNOLOGY_CONNECTIONS,
  GET_RELATED_TECHNOLOGIES,
} from "../queries/graph.queries.js";

export async function getAllTechnologies() {
  const session = createSession();

  try {
    const result = await session.run(GET_ALL_TECHNOLOGIES);

    return result.records.map((record) => ({
      name: record.get("name"),
    }));
  } finally {
    await session.close();
  }
}

export async function getProjectTechnologies(projectName: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_PROJECT_TECHNOLOGIES, {
      projectName,
    });

    return result.records.map((record) => ({
      name: record.get("technology"),
    }));
  } finally {
    await session.close();
  }
}

export async function getTechnologyProjects(technology: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_TECHNOLOGY_PROJECTS, {
      technology,
    });

    return result.records.map((record) => ({
      name: record.get("project"),
    }));
  } finally {
    await session.close();
  }
}

export async function getTechnologyConnections(technology: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_TECHNOLOGY_CONNECTIONS, {
      technology,
    });

    return result.records.map((record) => {
      const path = record.get("path");

      return path.segments.map((segment: any) => ({
        from: segment.start.properties.name,
        relationship: segment.relationship.type,
        to: segment.end.properties.name,
      }));
    });
  } finally {
    await session.close();
  }
}

export async function getRelatedTechnologies(technology: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_RELATED_TECHNOLOGIES, {
      technology,
    });

    return result.records.map((record) => ({
      technology: record.get("technology"),
      sharedProjects: record.get("sharedProjects").toNumber(),
    }));
  } finally {
    await session.close();
  }
}