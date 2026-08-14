import { driver } from "./neo4j.js";

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Starting database seed...");

    await session.run(`
      // Technologies
      MERGE (javascript:Technology {name: "JavaScript"})
      MERGE (typescript:Technology {name: "TypeScript"})
      MERGE (react:Technology {name: "React"})
      MERGE (redux:Technology {name: "Redux Toolkit"})
      MERGE (nextjs:Technology {name: "Next.js"})
      MERGE (nodejs:Technology {name: "Node.js"})
      MERGE (django:Technology {name: "Django"})
      MERGE (postgresql:Technology {name: "PostgreSQL"})
      MERGE (tailwind:Technology {name: "Tailwind CSS"})

      // Skills
      MERGE (frontend:Skill {name: "Frontend Development"})
      MERGE (stateManagement:Skill {name: "State Management"})
      MERGE (apiIntegration:Skill {name: "API Integration"})
      MERGE (performance:Skill {name: "Performance Optimization"})
      MERGE (authentication:Skill {name: "Authentication"})
      MERGE (systemDesign:Skill {name: "System Design"})

      // Projects
      MERGE (ecommerce:Project {name: "E-commerce Platform"})
      MERGE (erp:Project {name: "ERP System"})
      MERGE (blog:Project {name: "Blog Platform"})
      MERGE (chat:Project {name: "Real-time Chat Application"})

      // Jobs
      MERGE (frontendJob:Job {title: "Frontend Engineer"})
      MERGE (reactJob:Job {title: "React Developer"})
      MERGE (fullstackJob:Job {title: "Full Stack Developer"})
      MERGE (nextJob:Job {title: "Next.js Developer"})

      // Resources
      MERGE (reactDocs:Resource {name: "React Documentation"})
      MERGE (typescriptDocs:Resource {name: "TypeScript Handbook"})
      MERGE (nextDocs:Resource {name: "Next.js Documentation"})
      MERGE (mdn:Resource {name: "MDN Web Docs"})
    `);

    console.log("Nodes created.");

    await session.run(`
      // Technology relationships-uses
      MATCH (javascript:Technology {name: "JavaScript"})
      MATCH (typescript:Technology {name: "TypeScript"})
      MATCH (react:Technology {name: "React"})
      MATCH (redux:Technology {name: "Redux Toolkit"})
      MATCH (nextjs:Technology {name: "Next.js"})
      MATCH (nodejs:Technology {name: "Node.js"})

      MERGE (javascript)-[:RELATED_TO]->(typescript)
      MERGE (typescript)-[:USED_WITH]->(react)
      MERGE (react)-[:USED_WITH]->(redux)
      MERGE (react)-[:USED_WITH]->(nextjs)
      MERGE (javascript)-[:USED_WITH]->(nodejs)

      // Project relationships
      MATCH (ecommerce:Project {name: "E-commerce Platform"})
      MATCH (erp:Project {name: "ERP System"})
      MATCH (blog:Project {name: "Blog Platform"})
      MATCH (chat:Project {name: "Real-time Chat Application"})

      MATCH (react:Technology {name: "React"})
      MATCH (typescript:Technology {name: "TypeScript"})
      MATCH (redux:Technology {name: "Redux Toolkit"})
      MATCH (nextjs:Technology {name: "Next.js"})
      MATCH (nodejs:Technology {name: "Node.js"})

      MERGE (ecommerce)-[:USES]->(react)
      MERGE (ecommerce)-[:USES]->(typescript)
      MERGE (ecommerce)-[:USES]->(redux)

      MERGE (erp)-[:USES]->(react)
      MERGE (erp)-[:USES]->(typescript)

      MERGE (blog)-[:USES]->(react)
      MERGE (blog)-[:USES]->(nextjs)
      MERGE (blog)-[:USES]->(typescript)

      MERGE (chat)-[:USES]->(react)
      MERGE (chat)-[:USES]->(nodejs)

      // Project → Skill
      MATCH (frontend:Skill {name: "Frontend Development"})
      MATCH (stateManagement:Skill {name: "State Management"})
      MATCH (apiIntegration:Skill {name: "API Integration"})
      MATCH (performance:Skill {name: "Performance Optimization"})
      MATCH (authentication:Skill {name: "Authentication"})

      MERGE (ecommerce)-[:DEMONSTRATES]->(frontend)
      MERGE (ecommerce)-[:DEMONSTRATES]->(stateManagement)

      MERGE (erp)-[:DEMONSTRATES]->(frontend)
      MERGE (erp)-[:DEMONSTRATES]->(apiIntegration)

      MERGE (blog)-[:DEMONSTRATES]->(frontend)
      MERGE (blog)-[:DEMONSTRATES]->(performance)

      MERGE (chat)-[:DEMONSTRATES]->(apiIntegration)
      MERGE (chat)-[:DEMONSTRATES]->(authentication)

      // Job → Technology
      MATCH (frontendJob:Job {title: "Frontend Engineer"})
      MATCH (reactJob:Job {title: "React Developer"})
      MATCH (fullstackJob:Job {title: "Full Stack Developer"})
      MATCH (nextJob:Job {title: "Next.js Developer"})

      MERGE (frontendJob)-[:REQUIRES_TECH]->(react)
      MERGE (frontendJob)-[:REQUIRES_TECH]->(typescript)

      MERGE (reactJob)-[:REQUIRES_TECH]->(react)
      MERGE (reactJob)-[:REQUIRES_TECH]->(redux)

      MERGE (fullstackJob)-[:REQUIRES_TECH]->(react)
      MERGE (fullstackJob)-[:REQUIRES_TECH]->(nodejs)
      MERGE (fullstackJob)-[:REQUIRES_TECH]->(postgresql)

      MERGE (nextJob)-[:REQUIRES_TECH]->(react)
      MERGE (nextJob)-[:REQUIRES_TECH]->(nextjs)

      // Job → Skill
      MERGE (frontendJob)-[:REQUIRES]->(frontend)
      MERGE (frontendJob)-[:REQUIRES]->(performance)

      MERGE (reactJob)-[:REQUIRES]->(frontend)
      MERGE (reactJob)-[:REQUIRES]->(stateManagement)

      MERGE (fullstackJob)-[:REQUIRES]->(frontend)
      MERGE (fullstackJob)-[:REQUIRES]->(apiIntegration)
      MERGE (fullstackJob)-[:REQUIRES]->(authentication)

      MERGE (nextJob)-[:REQUIRES]->(frontend)
      MERGE (nextJob)-[:REQUIRES]->(performance)

      // Resources → Technology
      MATCH (reactDocs:Resource {name: "React Documentation"})
      MATCH (typescriptDocs:Resource {name: "TypeScript Handbook"})
      MATCH (nextDocs:Resource {name: "Next.js Documentation"})
      MATCH (mdn:Resource {name: "MDN Web Docs"})

      MERGE (reactDocs)-[:TEACHES]->(react)
      MERGE (typescriptDocs)-[:TEACHES]->(typescript)
      MERGE (nextDocs)-[:TEACHES]->(nextjs)
      MERGE (mdn)-[:TEACHES]->(javascript)
    `);

    console.log("Relationships created.");
    console.log("Database seed completed successfully.");
  } catch (error) {
    console.error("Database seed failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();