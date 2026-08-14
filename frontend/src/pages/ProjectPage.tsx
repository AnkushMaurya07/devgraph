import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getProjectSkills,
  getProjectTechnologies,
} from "../api/project.api";

import type {
  Skill,
  Technology,
} from "../types";

function ProjectPage() {
  const { projectName } = useParams();

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectName) return;

    async function loadProject() {
      try {
        setLoading(true);

        const decodedName = decodeURIComponent(projectName ?? "");

        const [
          technologyData,
          skillData,
        ] = await Promise.all([
          getProjectTechnologies(decodedName),
          getProjectSkills(decodedName),
        ]);

        setTechnologies(technologyData);
        setSkills(skillData);
      } catch (error) {
        console.error(error);

        setError("Unable to load project information.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectName]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-slate-400">
        Loading project...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-xl border border-red-900 bg-red-950/30 p-5 text-red-300">
          {error}
        </div>
      </div>
    );
  }

  const decodedName = decodeURIComponent(projectName ?? "");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/projects"
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to projects
      </Link>

      <div className="mt-8">
        <p className="text-sm font-medium tracking-widest text-cyan-400">
          PROJECT
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          {decodedName}
        </h1>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          Technologies
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <Link
              key={technology.name}
              to={`/technology/${encodeURIComponent(
                technology.name
              )}`}
              className="rounded-full border border-cyan-900 bg-cyan-950/40 px-4 py-2 text-sm text-cyan-300 transition hover:border-cyan-500"
            >
              {technology.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          Demonstrated skills
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProjectPage;