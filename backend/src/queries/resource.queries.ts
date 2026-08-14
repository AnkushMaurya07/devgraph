export const GET_ALL_RESOURCES = `
  MATCH (resource:Resource)
  RETURN resource.name AS name
  ORDER BY name
`;

export const GET_RESOURCES_FOR_TECHNOLOGY = `
  MATCH (resource:Resource)
    -[:TEACHES]->
    (technology:Technology {name: $technology})
  RETURN resource.name AS resource
  ORDER BY resource
`;