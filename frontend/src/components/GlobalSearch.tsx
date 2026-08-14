import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getTechnologies } from "../api/technology.api";
import { getProjects } from "../api/project.api";
import { getJobs } from "../api/job.api";

import type { Job, Project, Technology } from "../types";

function GlobalSearch() {
  const [query, setQuery] = useState("");

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadSearchData() {
      try {
        const [technologyData, projectData, jobData] =
          await Promise.all([
            getTechnologies(),
            getProjects(),
            getJobs(),
          ]);

        setTechnologies(technologyData);
        setProjects(projectData);
        setJobs(jobData);
      } catch (error) {
        console.error("Search data failed:", error);
      }
    }

    loadSearchData();
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return [
      ...technologies
        .filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
        .map((item) => ({
          type: "Technology",
          name: item.name,
          path: `/technology/${encodeURIComponent(item.name)}`,
        })),

      ...projects
        .filter((item) =>
          item.name.toLowerCase().includes(normalizedQuery)
        )
        .map((item) => ({
          type: "Project",
          name: item.name,
          path: `/projects/${encodeURIComponent(item.name)}`,
        })),

      ...jobs
        .filter((item) =>
          item.title.toLowerCase().includes(normalizedQuery)
        )
        .map((item) => ({
          type: "Job",
          name: item.title,
          path: `/jobs/${encodeURIComponent(item.title)}`,
        })),
    ];
  }, [query, technologies, projects, jobs]);

  return (
    <div className="relative mt-10 max-w-2xl">
      <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4">
        <span className="mr-3 text-slate-500">⌕</span>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search technologies, projects, or jobs..."
          className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      {query.trim() && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
          {results.length === 0 ? (
            <div className="p-5 text-sm text-slate-500">
              No matching results.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.name}`}
                  to={result.path}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-800"
                >
                  <span className="text-sm text-white">
                    {result.name}
                  </span>

                  <span className="text-xs text-cyan-400">
                    {result.type}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;