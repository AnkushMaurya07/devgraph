export const GET_ALL_PROJECTS = `
  MATCH (project:Project)
  RETURN project.name AS name
  ORDER BY name
`;

export const GET_PROJECT_BY_NAME = `
  MATCH (project:Project {name: $projectName})
  RETURN project
`;

export const GET_PROJECT_SKILLS = `
  MATCH (project:Project {name: $projectName})
    -[:DEMONSTRATES]->
    (skill:Skill)
  RETURN skill.name AS skill
  ORDER BY skill
`;