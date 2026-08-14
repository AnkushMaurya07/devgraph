import { driver } from "./neo4j.js";

async function resetDatabase() {
  const session = driver.session();

  try {
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Database reset successfully.");
  } catch (error) {
    console.error("Database reset failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

resetDatabase();