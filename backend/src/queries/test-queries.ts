import { driver } from "../db/neo4j.js";

async function runQuery() {
  const session = driver.session();

  try {
    const result = await session.run(
      `
        MATCH (react:Technology {name: $technology})
              <-[:USES]-
              (project:Project)
              -[:USES]->
              (related:Technology)

        WHERE related <> react

        RETURN related.name AS technology,
               count(DISTINCT project) AS sharedProjects

        ORDER BY sharedProjects DESC, technology
      `,
      {
        technology: "React",
      }
    );

    console.log("Technologies used alongside React:");

    for (const record of result.records) {
      console.log({
        technology: record.get("technology"),
        sharedProjects: record.get("sharedProjects").toNumber(),
      });
    }
  } catch (error) {
    console.error("Query failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

runQuery();