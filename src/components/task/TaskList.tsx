import { List, Box } from '@chakra-ui/react';
import TaskListItem from './TaskListItem';
import { Task } from '.prisma/client';

type Props = {
  tasks: Task[];
  setSelectedTask: (task: Task) => void;
  handleTaskUpdate: (task: Task) => void;
  color?: string
};

const TaskList: React.FC<Props> = ({ tasks, setSelectedTask, handleTaskUpdate, color }) => {
  return (
    <Box>
      <List>
        {tasks.map((task: Task) => (
          <TaskListItem
            key={task.id}
            task={task}
            setSelectedTask={setSelectedTask}
            handleTaskUpdate={handleTaskUpdate}
            color={color}
          />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
