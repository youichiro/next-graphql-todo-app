import { Project } from ".prisma/client";

export const sortProjects = (projects: Project[]): Project[] => {
  const projectsArray = [...projects]
  if (projectsArray.length < 2) {
    return projectsArray;
  }
  return projectsArray.sort((a, b) => a.id - b.id);
}
