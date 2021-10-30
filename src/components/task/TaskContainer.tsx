import { useMutation, useQuery } from '@apollo/client';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import { sortTask } from '../../functional/sortTasks';
import { CreateTask, DeleteTask, UpdateTask } from '../../graphql/mutations';
import { SelectedProjectQuery } from '../../graphql/queries';
import { SessionContext } from '../../pages';
import TaskCreateForm from './TaskCreateForm';
import TaskDeleteButton from './TaskDeleteButton';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import { Task } from '.prisma/client';

export const TaskContext = createContext<{ selectedTask: Task | null }>({
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
  const [deleteTask, mutation3] = useMutation(DeleteTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Error... {query.error.message}</p>;
  if (!query.data.selectedProject) return <p>Select your project.</p>;
  if (mutation1.error) return <p>Submission error! {mutation1.error.message}</p>;
  if (mutation2.error) return <p>Submission error! {mutation2.error.message}</p>;
  if (mutation3.error) return <p>Submission error! {mutation3.error.message}</p>;

  const handleTaskCreate = (title: string, resetForm: () => void) => {
    if (title) {
      createTask({
        variables: {
          projectId: query.data.selectedProject?.project.id,
          title: title,
          description: '',
        },
      });
      resetForm();
    }
  };

  const handleTaskUpdate = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        title: task.title,
        description: task.description,
        done: task.done,
      },
    });
    setSelectedTask(task);
  };

  const handleTaskDelete = () => {
    if (selectedTask) {
      deleteTask({
        variables: {
          id: selectedTask.id,
        },
      });
      setSelectedTask(null);
    }
  };

  const tasks = sortTask(query.data.selectedProject.project.tasks);

  return (
    <TaskContext.Provider value={{ selectedTask }}>
      <Flex h='100%'>
        <Stack flex='1' spacing='24px' mx='16px' my='32px'>
          <Heading size='md'>{query.data.selectedProject.project.name}</Heading>
          <TaskCreateForm handleTaskCreate={handleTaskCreate} />
          <TaskList
            tasks={tasks}
            setSelectedTask={setSelectedTask}
            handleTaskUpdate={handleTaskUpdate}
          />
        </Stack>
        <Stack flex='1' borderLeft='solid 1px whitesmoke' px='16px' py='32px' spacing='16px'>
          <TaskDetail selectedTask={selectedTask} handleTaskUpdate={handleTaskUpdate} />
          <Box borderTop='solid 1px whitesmoke' textAlign='right' hidden={!selectedTask}>
            <TaskDeleteButton handleTaskDelete={handleTaskDelete} />
          </Box>
        </Stack>
      </Flex>
    </TaskContext.Provider>
  );
};

export default TaskContainer;
