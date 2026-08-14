export const GET_ALL_TECHNOLOGIES = `
  MATCH (technology:Technology)
  RETURN technology.name AS name
  ORDER BY name
`;

export const GET_PROJECT_TECHNOLOGIES = `
  MATCH (project:Project {name: $projectName})
    -[:USES]->
    (technology:Technology)
  RETURN technology.name AS technology
  ORDER BY technology
`;

export const GET_TECHNOLOGY_PROJECTS = `
  MATCH (project:Project)-[:USES]->(technology:Technology)
  WHERE technology.name = $technology
  RETURN project.name AS project
  ORDER BY project
`;