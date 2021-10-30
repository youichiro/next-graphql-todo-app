import { useMutation, useQuery } from '@apollo/client';
import { Box, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import { sortTask, filterIncomplateTasks, filterComplateTasks } from '../../functional/tasks';
import { CreateTask, DeleteTask, UpdateTask } from '../../graphql/mutations';
import { SelectedProjectQuery } from '../../graphql/queries';
import { SessionContext } from '../../pages';
import Loading from '../common/Loading';
import TaskCreateForm from './TaskCreateForm';
import TaskDeleteButton from './TaskDeleteButton';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import { Task } from '.prisma/client';
import TaskProjectHeading from './TaskProjectHeading';

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

  if (query.loading) return <Loading />;
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
  const incomplateTasks = filterIncomplateTasks(tasks);
  const complateTasks = filterComplateTasks(tasks);

  return (
    <TaskContext.Provider value={{ selectedTask }}>
      <Flex h='100%'>
        <Stack flex='1' spacing='24px' px='16px' my='32px' overflow='scroll'>
          <TaskProjectHeading projectName={query.data.selectedProject.project.name} />
          <TaskCreateForm handleTaskCreate={handleTaskCreate} />
          <TaskList
            tasks={incomplateTasks}
            setSelectedTask={setSelectedTask}
            handleTaskUpdate={handleTaskUpdate}
          />
          <Box pt='32px' hidden={complateTasks.length === 0}>
            <Text color='gray'>Complated</Text>
          </Box>
          <TaskList
            tasks={complateTasks}
            setSelectedTask={setSelectedTask}
            handleTaskUpdate={handleTaskUpdate}
            color='gray'
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
