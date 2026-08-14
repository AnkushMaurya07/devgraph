import { driver } from "./neo4j.js";

async function testQuery() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (node)
      RETURN labels(node) AS labels, count(node) AS count
      ORDER BY labels
    `);

    for (const record of result.records) {
      console.log({
        labels: record.get("labels"),
        count: record.get("count").toNumber(),
      });
    }
  } catch (error) {
    console.error("Query failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

testQuery();