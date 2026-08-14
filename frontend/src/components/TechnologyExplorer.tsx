import { useEffect, useState } from "react";

import { getTechnologies } from "../api/technology.api";

import type { Technology } from "../types";

import { Link } from "react-router-dom";

function TechnologyExplorer() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTechnologies() {
      try {
        const data = await getTechnologies();

        setTechnologies(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load technologies.");
      } finally {
        setLoading(false);
      }
    }

    loadTechnologies();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 text-sm text-slate-400">
        Loading technologies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
        {error}
      </div>
    );
  }

  if (technologies.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-slate-800 p-8 text-center text-slate-400">
        No technologies found.
      </div>
    );
  }

  return (
    <section className="mt-14">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">
          Explore technologies
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Discover what technologies are connected through the graph.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.map((technology) => (
            <Link
                key={technology.name}
                to={`/technology/${encodeURIComponent(
                    technology.name
                )}`}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-slate-800"
                >
                <p className="font-medium text-white">
                    {technology.name}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                    Explore connections →
                </p>
            </Link>
        ))}
      </div>
    </section>
  );
}

export default TechnologyExplorer;