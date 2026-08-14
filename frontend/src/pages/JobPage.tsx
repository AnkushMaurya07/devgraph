import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getJobSkills,
  getJobTechnologies,
  getRecommendedProjects,
} from "../api/job.api";

import type {
  RecommendedProject,
  Skill,
  Technology,
} from "../types";

function JobPage() {
  const { jobTitle } = useParams();

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<RecommendedProject[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobTitle) return;

    async function loadJob() {
      try {
        setLoading(true);

        const decodedTitle = decodeURIComponent(jobTitle ?? "");

        const [
          technologyData,
          skillData,
          projectData,
        ] = await Promise.all([
          getJobTechnologies(decodedTitle),
          getJobSkills(decodedTitle),
          getRecommendedProjects(decodedTitle),
        ]);

        setTechnologies(technologyData);
        setSkills(skillData);
        setProjects(projectData);
      } catch (error) {
        console.error(error);

        setError("Unable to load job information.");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [jobTitle]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-slate-400">
        Loading job...
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

  const decodedTitle = decodeURIComponent(jobTitle ?? "");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        to="/jobs"
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to jobs
      </Link>

      <div className="mt-8">
        <p className="text-sm font-medium tracking-widest text-cyan-400">
          CAREER PATH
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          {decodedTitle}
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Explore the technologies, skills, and projects
          connected to this role.
        </p>
      </div>

      {/* Technologies */}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          Required technologies
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <span
              key={technology.name}
              className="rounded-full border border-cyan-900 bg-cyan-950/40 px-4 py-2 text-sm text-cyan-300"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </section>

      {/* Skills */}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          Required skills
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

      {/* Recommended projects */}

      <section className="mt-16">
        <div>
          <p className="text-sm font-medium tracking-widest text-cyan-400">
            GRAPH MATCH
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Projects that demonstrate these skills
          </h2>

          <p className="mt-2 text-slate-400">
            Ranked by how many required skills each project
            demonstrates.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {projects.map((project, index) => (
            <div
              key={project.project}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                      #{index + 1}
                    </span>

                    <h3 className="text-lg font-semibold">
                      {project.project}
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.matchingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-2xl font-bold text-cyan-400">
                    {project.skillCount}
                  </p>

                  <p className="text-xs text-slate-500">
                    matching skills
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default JobPage;