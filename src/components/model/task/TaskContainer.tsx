import { useQuery } from '@apollo/client';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';
import { sortTask, filterIncomplateTasks, filterComplateTasks } from '../../../functional/tasks';
import { SelectedProjectQuery } from '../../../graphql/queries';
import Loading from '../../common/Loading';
import { SessionContext } from '../../page/Top';
import TaskCreateForm from './TaskCreateForm';
import TaskDeleteButton from './TaskDeleteButton';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import TaskProjectHeading from './TaskProjectHeading';
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

  if (query.loading) return <Loading />;
  if (query.error) return <p>Error... {query.error.message}</p>;
  if (!query.data.selectedProject) return <p>Select your project.</p>;

  const tasks = sortTask(query.data.selectedProject.project.tasks);
  const incomplateTasks = filterIncomplateTasks(tasks);
  const complateTasks = filterComplateTasks(tasks);

  return (
    <TaskContext.Provider value={{ selectedTask }}>
      <Flex h='100%'>
        <Stack flex='1' spacing='24px' px='16px' my='32px' overflow='scroll'>
          <TaskProjectHeading projectName={query.data.selectedProject.project.name} />
          <TaskCreateForm projectId={query.data.selectedProject.project.id} />
          <TaskList tasks={incomplateTasks} setSelectedTask={setSelectedTask} />
          <Box pt='32px' hidden={complateTasks.length === 0}>
            <Text color='gray'>Complated</Text>
          </Box>
          <TaskList tasks={complateTasks} setSelectedTask={setSelectedTask} color='gray' />
        </Stack>
        <Stack flex='1' borderLeft='solid 1px whitesmoke' px='16px' py='32px' spacing='16px'>
          <TaskDetail selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
          <Box borderTop='solid 1px whitesmoke' textAlign='right' hidden={!selectedTask}>
            <TaskDeleteButton taskId={selectedTask?.id} setSelectedTask={setSelectedTask} />
          </Box>
        </Stack>
      </Flex>
    </TaskContext.Provider>
  );
};

export default TaskContainer;
