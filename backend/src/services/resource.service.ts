import { createSession } from "../db/session.js";

import {
  GET_ALL_RESOURCES,
  GET_RESOURCES_FOR_TECHNOLOGY,
} from "../queries/resource.queries.js";

export async function getAllResources() {
  const session = createSession();

  try {
    const result = await session.run(GET_ALL_RESOURCES);

    return result.records.map((record) => ({
      name: record.get("name"),
    }));
  } finally {
    await session.close();
  }
}

export async function getResourcesForTechnology(
  technology: string
) {
  const session = createSession();

  try {
    const result = await session.run(
      GET_RESOURCES_FOR_TECHNOLOGY,
      {
        technology,
      }
    );

    return result.records.map((record) => ({
      name: record.get("resource"),
    }));
  } finally {
    await session.close();
  }
}