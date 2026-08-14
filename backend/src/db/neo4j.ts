import neo4j from "neo4j-driver";
import "dotenv/config";

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

if (!uri || !username || !password) {
  throw new Error("CognoDB environment variables are missing");
}

export const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password),
  {
    maxConnectionLifetime: 5 * 60 * 1000,
    connectionTimeout: 15 * 1000,
    maxConnectionPoolSize: 20,
  }
);


driver
  .verifyConnectivity()
  .then(() => {
    console.log("✅ CognoDB connection established");
  })
  .catch((error) => {
    console.error("❌ CognoDB connection failed:", error);
  });