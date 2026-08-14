import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJobs } from "../api/job.api";

import type { Job } from "../types";

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await getJobs();

        setJobs(data);
      } catch (error) {
        console.error(error);

        setError("Unable to load jobs.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-slate-400">
        Loading jobs...
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
        CAREER EXPLORER
      </p>

      <h1 className="mt-2 text-4xl font-bold">
        Explore developer roles
      </h1>

      <p className="mt-4 max-w-2xl text-slate-400">
        See what technologies and skills are connected to
        different development roles.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <Link
            key={job.title}
            to={`/jobs/${encodeURIComponent(job.title)}`}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
          >
            <h2 className="text-xl font-semibold">
              {job.title}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Explore requirements and recommended projects →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobsPage;