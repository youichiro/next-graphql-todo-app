import { ListItem, Checkbox } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
  setSelectedTask: (task: Task) => void;
};

const TaskListItem: React.FC<Props> = ({ task, setSelectedTask }) => {
  const { selectedTask } = useContext(TaskContext);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <ListItem
      key={task.id}
      py='8px'
      px='16px'
      onClick={() => handleClick(task)}
      bg={selectedTask?.id === task.id ? 'gray.100' : ''}
      borderRadius='8px'
    >
      <Checkbox colorScheme='teal' isChecked={task.done} color={!task.title ? 'gray' : ''}>
        {task.title || 'untitled'}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
