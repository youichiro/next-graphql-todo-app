import { gql } from '@apollo/client'

export const ProjectsQuery = gql`
  query Projects($userId: Int!) {
    projects(userId: $userId) {
      id
      name
    }
    selectedProject(userId: $userId) {
      project {
        id
        tasks {
          id
          title
        }
      }
    }
  }
`;

export const SelectedProjectQuery = gql`
  query SelectedProject($userId: Int!) {
    selectedProject(userId: $userId) {
      project {
        id
        tasks {
          id
          title
        }
      }
    }
  }
`;
