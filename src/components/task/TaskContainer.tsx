import { gql, useMutation, useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { SessionContext } from '../../pages';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const SelectedProjectQuery = gql`
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

const CreateTask = gql`
  mutation CreateTask($projectId: Int!, $title: String!) {
    createTask(projectId: $projectId, title: $title) {
      id
      title
      done
    }
  }
`;

const TaskContainer: React.FC = () => {
  const { session } = useContext(SessionContext);
  const query = useQuery(SelectedProjectQuery, {
    variables: { userId: session.userId },
  });

  const [createTask, mutation] = useMutation(CreateTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Error... {query.error.message}</p>;
  if (!query.data.selectedProject) return <p>Select your project.</p>;
  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  const handleTaskSubmit = (title: string) => {
    createTask({ variables: { projectId: query.data.selectedProject?.project.id, title: title } });
  };

  return (
    <Box>
      <TaskForm handleSubmit={handleTaskSubmit} />
      <TaskList tasks={query.data.selectedProject?.project.tasks} />
    </Box>
  );
};

export default TaskContainer;
