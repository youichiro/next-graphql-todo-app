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

export const UpdateTask = gql`
  mutation UpdateTask($id: Int!, $title: String!, $description: String!, $done: Boolean!) {
    updateTask(id: $id, title: $title, description: $description, done: $done) {
      id
    }
  }
`
