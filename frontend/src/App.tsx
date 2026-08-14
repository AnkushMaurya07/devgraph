import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import TechnologyPage from "./pages/TechnologyPage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/technology/:technology"
            element={<TechnologyPage />}
          />

          <Route
            path="/jobs"
            element={<JobsPage />}
          />

          <Route
            path="/jobs/:jobTitle"
            element={<JobPage />}
          />

          <Route
            path="/projects"
            element={<ProjectsPage />}
          />

          <Route
            path="/projects/:projectName"
            element={<ProjectPage />}
          />

        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;