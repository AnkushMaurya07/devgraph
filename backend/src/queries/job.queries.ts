export const GET_ALL_JOBS = `
  MATCH (job:Job)
  RETURN job.title AS title
  ORDER BY title
`;

export const GET_JOB_TECHNOLOGIES = `
  MATCH (job:Job {title: $jobTitle})
    -[:REQUIRES_TECH]->
    (technology:Technology)
  RETURN technology.name AS technology
  ORDER BY technology
`;

export const GET_JOB_SKILLS = `
  MATCH (job:Job {title: $jobTitle})
    -[:REQUIRES]->
    (skill:Skill)
  RETURN skill.name AS skill
  ORDER BY skill
`;

export const GET_JOB_RECOMMENDED_PROJECTS = `
  MATCH (job:Job {title: $jobTitle})
        -[:REQUIRES]->
        (skill:Skill)
        <-[:DEMONSTRATES]-
        (project:Project)

  RETURN project.name AS project,
         collect(DISTINCT skill.name) AS matchingSkills,
         count(DISTINCT skill) AS skillCount

  ORDER BY skillCount DESC, project
`;