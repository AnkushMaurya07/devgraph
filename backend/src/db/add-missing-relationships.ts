import { driver } from "./neo4j.js";

async function addMissingRelationships() {
  const session = driver.session();

  try {
    console.log("Adding missing technology relationships...");

    await session.run(`
      // Technologies
      MATCH (javascript:Technology {name: "JavaScript"})
      MATCH (react:Technology {name: "React"})
      MATCH (django:Technology {name: "Django"})
      MATCH (postgresql:Technology {name: "PostgreSQL"})
      MATCH (tailwind:Technology {name: "Tailwind CSS"})

      // Projects
      MATCH (ecommerce:Project {name: "E-commerce Platform"})
      MATCH (erp:Project {name: "ERP System"})
      MATCH (blog:Project {name: "Blog Platform"})

      // JavaScript → Projects
      MERGE (ecommerce)-[:USES]->(javascript)
      MERGE (erp)-[:USES]->(javascript)
      MERGE (blog)-[:USES]->(javascript)

      // Django → ERP
      MERGE (erp)-[:USES]->(django)

      // PostgreSQL → ERP
      MERGE (erp)-[:USES]->(postgresql)

      // Tailwind CSS → Projects
      MERGE (ecommerce)-[:USES]->(tailwind)
      MERGE (blog)-[:USES]->(tailwind)

      // Technology relationships
      MERGE (javascript)-[:USED_WITH]->(react)
      MERGE (django)-[:USED_WITH]->(postgresql)
      MERGE (tailwind)-[:USED_WITH]->(react)
    `);

    console.log("Missing relationships added successfully.");
  } catch (error) {
    console.error("Failed to add relationships:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

addMissingRelationships();