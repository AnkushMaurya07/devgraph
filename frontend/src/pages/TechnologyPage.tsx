import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TechnologyGraph from "../components/TechnologyGraph";

import {
  getRelatedTechnologies,
  getTechnologyProjects,
  getTechnologyResources,
} from "../api/technology.api";

import type {
  Project,
  RelatedTechnology,
  Resource,
} from "../types";

function TechnologyPage() {
  const { technology } = useParams();

  const [projects, setProjects] = useState<Project[]>([]);
  const [related, setRelated] = useState<RelatedTechnology[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!technology) return;

    async function loadData() {
      try {
        setLoading(true);

        const decodedTechnology = decodeURIComponent(
            technology ?? ""
        );

        const [projectsData, relatedData, resourcesData] =
          await Promise.all([
            getTechnologyProjects(decodedTechnology),
            getRelatedTechnologies(decodedTechnology),
            getTechnologyResources(decodedTechnology),
          ]);

        setProjects(projectsData);
        setRelated(relatedData);
        setResources(resourcesData);
      } catch (error) {
        console.error(error);

        setError("Unable to load technology information.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [technology]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-slate-400">
        Loading technology...
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

  const decodedTechnology = decodeURIComponent(
    technology ?? ""
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Back */}

      <Link
        to="/"
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to technologies
      </Link>

      {/* Technology Header */}

      <div className="mt-8">
        <p className="text-sm font-medium tracking-widest text-cyan-400">
          TECHNOLOGY
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          {decodedTechnology}
        </h1>
      </div>

      {/* Graph View */}

      <section className="mt-12">
        <div>
          <p className="text-sm font-medium tracking-widest text-cyan-400">
            GRAPH VIEW
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Explore the {decodedTechnology} graph
          </h2>

          <p className="mt-2 text-slate-400">
            Visualize how this technology connects to projects
            and related technologies.
          </p>
        </div>

        <TechnologyGraph
          technology={decodedTechnology}
          projects={projects.map((project) => project.name)}
          relatedTechnologies={related.map(
            (item) => item.technology
          )}
        />
      </section>

      {/* Projects */}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Projects using {decodedTechnology}
        </h2>

        {projects.length === 0 ? (
          <p className="mt-5 text-slate-500">
            No projects found.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-medium">
                  {project.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Technologies */}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Technologies commonly used with{" "}
          {decodedTechnology}
        </h2>

        {related.length === 0 ? (
          <p className="mt-5 text-slate-500">
            No related technologies found.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <div
                key={item.technology}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="font-medium">
                  {item.technology}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Used in {item.sharedProjects} project
                  {item.sharedProjects !== 1 ? "s" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Learning Resources */}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">
          Learning resources
        </h2>

        {resources.length === 0 ? (
          <p className="mt-5 text-slate-500">
            No learning resources found.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                {resource.name}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TechnologyPage;