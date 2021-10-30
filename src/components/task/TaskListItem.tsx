import { ListItem, Checkbox } from '@chakra-ui/react';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
  setSelectedTask: (task: Task) => void
};

const TaskListItem: React.FC<Props> = ({ task, setSelectedTask }) => {
  const handleClick = (task: Task) => {
    setSelectedTask(task);
  };
  return (
    <ListItem key={task.id} px='16px' py='8px' onClick={() => handleClick(task)}>
      <Checkbox colorScheme='teal' isChecked={task.done}>
        {task.title}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
