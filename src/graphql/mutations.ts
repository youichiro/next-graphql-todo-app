import { gql } from '@apollo/client';

export const UpsertSelectedProject = gql`
  mutation UpsertSelectedPorject($userId: Int!, $projectId: Int!) {
    upsertSelectedProject(userId: $userId, projectId: $projectId) {
      id
    }
  }
`;

export const CreateTask = gql`
  mutation CreateTask($projectId: Int!, $title: String!) {
    createTask(projectId: $projectId, title: $title) {
      id
      title
      done
    }
  }
`;
