import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from "../api/project.api";

import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();

        setProjects(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-slate-400">
        Loading projects...
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm font-medium tracking-widest text-cyan-400">
        PROJECT EXPLORER
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        Explore projects
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        See which technologies and skills are connected to
        each project.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.name}
            to={`/projects/${encodeURIComponent(project.name)}`}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
          >
            <h2 className="text-xl font-semibold">
              {project.name}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Explore project connections →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;