import express from "express";
import cors from "cors";
import "dotenv/config";

import { driver } from "./db/neo4j.js";
import technologyRoutes from "./routes/technology.routes.js";
import projectRoutes from "./routes/project.routes.js";
import jobRoutes from "./routes/job.routes.js";
import resourceRoutes from "./routes/resource.routes.js";

import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/technologies", technologyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resources", resourceRoutes);

app.get("/health", async (_req, res) => {
  try {
    const session = driver.session();

    const result = await session.run("RETURN 1 AS result");

    await session.close();

    res.json({
      status: "ok",
      database: result.records[0].get("result"),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});