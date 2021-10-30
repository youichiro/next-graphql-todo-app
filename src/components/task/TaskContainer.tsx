import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { CreateTask } from '../../graphql/mutations';
import { SelectedProjectQuery } from '../../graphql/queries';
import { SessionContext } from '../../pages';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

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

  const handleTaskSubmit = (title: string, resetForm: () => void) => {
    if (title) {
      createTask({ variables: { projectId: query.data.selectedProject?.project.id, title: title } });
      resetForm()
    }
  };

  return (
    <Box>
      <Heading size="md" pt='32px' pb='16px' px='16px'>{query.data.selectedProject.project.name}</Heading>
      <TaskForm handleSubmit={handleTaskSubmit} />
      <TaskList tasks={query.data.selectedProject.project.tasks} />
    </Box>
  );
};

export default TaskContainer;
