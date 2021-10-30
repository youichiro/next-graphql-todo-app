import { gql } from '@apollo/client'

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
