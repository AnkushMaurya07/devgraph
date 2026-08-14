import TechnologyExplorer from "../components/TechnologyExplorer";
import GlobalSearch from "../components/GlobalSearch";

function HomePage() {
  return (
    <div>
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-4 text-sm font-medium tracking-widest text-cyan-400">
            DEVELOPER KNOWLEDGE GRAPH
          </p>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
            Explore the connections behind modern development.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Discover relationships between technologies, projects,
            skills, jobs, and learning resources through a graph-powered
            knowledge base.
          </p>
          <GlobalSearch />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <TechnologyExplorer />
      </div>
    </div>
  );
}

export default HomePage;