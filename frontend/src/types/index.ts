export interface Technology {
  name: string;
}

export interface Project {
  name: string;
}

export interface Job {
  title: string;
}

export interface Resource {
  name: string;
}

export interface RelatedTechnology {
  technology: string;
  sharedProjects: number;
}

export interface RecommendedProject {
  project: string;
  matchingSkills: string[];
  skillCount: number;
}

export interface ApiResponse<T> {
  data: T;
}

export interface Skill {
  name: string;
}