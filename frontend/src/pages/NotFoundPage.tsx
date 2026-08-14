import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-cyan-400">
        404
      </p>

      <h1 className="mt-4 text-5xl font-bold">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-slate-400">
        The page you're looking for doesn't exist in the
        DevGraph.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
      >
        Back to Explore
      </Link>
    </div>
  );
}

export default NotFoundPage;