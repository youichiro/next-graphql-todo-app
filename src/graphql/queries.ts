import { gql } from '@apollo/client'

export interface TasksQuery {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface ProjectsQuery {
  id: number;
  name: string;
  tasks?: TasksQuery[]
}

export interface SelectedProjectQuery {
  id: number;
  project: ProjectsQuery
}

export interface ProjectsQueryData {
  projects: ProjectsQuery[];
  selectedProject: SelectedProjectQuery | null;
}

export interface ProjectsQueryVars {
  userId: number;
}

export const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
    selectedProject(userId: $userId) {
      id
      project {
        id
        name
        tasks {
          id
          title
          description
          done
        }
      }
    }
  }
`;

export interface SelectedProjectQueryData {
  selectedProject: SelectedProjectQuery | null;
}

export const SelectedProjectQuery = gql`
  query SelectedProject($userId: Int!) {
    selectedProject(userId: $userId) {
      id
      project {
        id
        name
        tasks {
          id
          title
          description
          done
        }
      }
    }
  }
`;
