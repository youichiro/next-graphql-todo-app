import { ListItem, Checkbox } from '@chakra-ui/react';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
};

const TaskListItem: React.FC<Props> = ({ task }) => {
  return (
    <ListItem key={task.id} px='16px' py='8px'>
      <Checkbox colorScheme='teal' isChecked={task.done}s>
        {task.title}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
