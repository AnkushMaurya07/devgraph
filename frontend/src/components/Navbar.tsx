import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          Dev<span className="text-cyan-400">Graph</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className="text-slate-400 transition hover:text-white"
          >
            Explore
          </Link>

          <Link
            to="/projects"
            className="text-slate-400 transition hover:text-white"
          >
            Projects
          </Link>

          <Link
            to="/jobs"
            className="text-slate-400 transition hover:text-white"
          >
            Jobs
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;