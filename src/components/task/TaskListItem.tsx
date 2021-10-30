import { ListItem, Checkbox } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
  setSelectedTask: (task: Task) => void;
  handleTaskUpdate: (task: Task) => void;
};

const TaskListItem: React.FC<Props> = ({ task, setSelectedTask, handleTaskUpdate }) => {
  const { selectedTask } = useContext(TaskContext);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCheck = () => {
    const newTask: Task = {
      ...task,
      done: !task.done
    }
    handleTaskUpdate(newTask);
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
      <Checkbox
        colorScheme='teal'
        isChecked={task.done}
        color={!task.title ? 'gray' : ''}
        onChange={() => handleCheck()}
      >
        {task.title || 'untitled'}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
