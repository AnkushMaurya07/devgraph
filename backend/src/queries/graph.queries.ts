export const GET_TECHNOLOGY_CONNECTIONS = `
  MATCH path =
    (technology:Technology {name: $technology})
    -[:RELATED_TO|USED_WITH*1..2]-
    (connected:Technology)
  RETURN path
  LIMIT 20
`;

export const GET_RELATED_TECHNOLOGIES = `
  MATCH (technology:Technology {name: $technology})
        <-[:USES]-
        (project:Project)
        -[:USES]->
        (related:Technology)

  WHERE related <> technology

  RETURN related.name AS technology,
         count(DISTINCT project) AS sharedProjects

  ORDER BY sharedProjects DESC, technology
`;