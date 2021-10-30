import { ListItem, Checkbox } from '@chakra-ui/react';
import { useContext } from 'react';
import { TaskContext } from './TaskContainer';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
};

const TaskListItem: React.FC<Props> = ({ task }) => {
  const { setSelectedTaskId } = useContext(TaskContext);
  const handleClick = (taskId: number) => {
    setSelectedTaskId(taskId);
  };
  return (
    <ListItem key={task.id} px='16px' py='8px' onClick={() => handleClick(task.id)}>
      <Checkbox colorScheme='teal' isChecked={task.done} s>
        {task.title}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
