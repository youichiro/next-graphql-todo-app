import { List, Box } from '@chakra-ui/react';
import TaskListItem from './TaskListItem';
import { Task } from '.prisma/client';

type Props = {
  tasks: Task[];
  setSelectedTask: (task: Task) => void
};

const TaskList: React.FC<Props> = ({ tasks, setSelectedTask }) => {
  return (
    <Box my='32px' px='16px'>
      <List>
        {tasks.map((task: Task) => (
          <TaskListItem key={task.id} task={task} setSelectedTask={setSelectedTask} />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
