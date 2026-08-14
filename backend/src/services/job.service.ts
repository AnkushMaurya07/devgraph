import { createSession } from "../db/session.js";

import {
  GET_ALL_JOBS,
  GET_JOB_TECHNOLOGIES,
  GET_JOB_SKILLS,
  GET_JOB_RECOMMENDED_PROJECTS,
} from "../queries/job.queries.js";

export async function getAllJobs() {
  const session = createSession();

  try {
    const result = await session.run(GET_ALL_JOBS);

    return result.records.map((record) => ({
      title: record.get("title"),
    }));
  } finally {
    await session.close();
  }
}

export async function getJobTechnologies(jobTitle: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_JOB_TECHNOLOGIES, {
      jobTitle,
    });

    return result.records.map((record) => ({
      name: record.get("technology"),
    }));
  } finally {
    await session.close();
  }
}

export async function getJobSkills(jobTitle: string) {
  const session = createSession();

  try {
    const result = await session.run(GET_JOB_SKILLS, {
      jobTitle,
    });

    return result.records.map((record) => ({
      name: record.get("skill"),
    }));
  } finally {
    await session.close();
  }
}

export async function getJobRecommendedProjects(
  jobTitle: string
) {
  const session = createSession();

  try {
    const result = await session.run(
      GET_JOB_RECOMMENDED_PROJECTS,
      {
        jobTitle,
      }
    );

    return result.records.map((record) => ({
      project: record.get("project"),
      matchingSkills: record.get("matchingSkills"),
      skillCount: record.get("skillCount").toNumber(),
    }));
  } finally {
    await session.close();
  }
}