import { useMutation, useQuery } from '@apollo/client';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import { CreateTask, UpdateTask } from '../../graphql/mutations';
import { SelectedProjectQuery } from '../../graphql/queries';
import { SessionContext } from '../../pages';
import TaskCreateForm from './TaskCreateForm';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import { Task } from '.prisma/client';

interface TaskContextInterface {
  selectedTask: Task | null;
}

export const TaskContext = createContext<TaskContextInterface>({
  selectedTask: null,
});

const TaskContainer: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { session } = useContext(SessionContext);

  const query = useQuery(SelectedProjectQuery, {
    variables: { userId: session.userId },
  });
  const [createTask, mutation1] = useMutation(CreateTask, {
    refetchQueries: [SelectedProjectQuery],
  });
  const [updateTask, mutation2] = useMutation(UpdateTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Error... {query.error.message}</p>;
  if (!query.data.selectedProject) return <p>Select your project.</p>;
  if (mutation1.error) return <p>Submission error! {mutation1.error.message}</p>;
  if (mutation2.error) return <p>Submission error! {mutation2.error.message}</p>;

  const handleTaskCreateSubmit = (title: string, resetForm: () => void) => {
    if (title) {
      createTask({
        variables: { projectId: query.data.selectedProject?.project.id, title: title },
      });
      resetForm();
    }
  };

  const handleTaskUpdateChange = (task: Task) => {
    if (task.title) {
      updateTask({
        variables: {
          id: task.id,
          title: task.title,
          description: task.description,
          done: task.done
        }
      })
    }
  }

  return (
    <TaskContext.Provider value={{ selectedTask }}>
      <Flex h='100%'>
        <Box flex='1'>
          <Heading size='md' pt='32px' pb='16px' px='16px'>
            {query.data.selectedProject.project.name}
          </Heading>
          <TaskCreateForm handleSubmit={handleTaskCreateSubmit} />
          <TaskList
            tasks={query.data.selectedProject.project.tasks}
            setSelectedTask={setSelectedTask}
          />
        </Box>
        <Box flex='1' borderLeft='solid 1px whitesmoke'>
          <TaskDetail selectedTask={selectedTask} handleTaskUpdateChange={handleTaskUpdateChange} />
        </Box>
      </Flex>
    </TaskContext.Provider>
  );
};

export default TaskContainer;
