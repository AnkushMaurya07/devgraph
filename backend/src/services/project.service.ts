import { createSession } from "../db/session.js";

import {
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_NAME,
  GET_PROJECT_SKILLS,
} from "../queries/project.queries.js";

export async function getAllProjects() {
  const session = createSession();

  try {
    const result = await session.run(GET_ALL_PROJECTS);

    return result.records.map((record) => ({
      name: record.get("name"),
    }));
  } finally {
    await session.close();
  }
}

export async function getProjectByName(projectName: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_PROJECT_BY_NAME, {
      projectName,
    });

    if (result.records.length === 0) {
      return null;
    }

    const project = result.records[0].get("project");

    return {
      name: project.properties.name,
    };
  } finally {
    await session.close();
  }
}

export async function getProjectSkills(projectName: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_PROJECT_SKILLS, {
      projectName,
    });

    return result.records.map((record) => ({
      name: record.get("skill"),
    }));
  } finally {
    await session.close();
  }
}