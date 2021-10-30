import { gql } from '@apollo/client';

export const CreateProject = gql`
  mutation CreateProject($userId: Int!, $name: String!) {
    createProject(userId: $userId, name: $name) {
      id
    }
  }
`

export const UpdateProject = gql`
  mutation UpdateProject($id: Int!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
    }
  }
`

export const UpsertSelectedProject = gql`
  mutation UpsertSelectedPorject($userId: Int!, $projectId: Int!) {
    upsertSelectedProject(userId: $userId, projectId: $projectId) {
      id
    }
  }
`;

export const CreateTask = gql`
  mutation CreateTask($projectId: Int!, $title: String!, $description: String!) {
    createTask(projectId: $projectId, title: $title, description: $description) {
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

export const DeleteTask = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`
