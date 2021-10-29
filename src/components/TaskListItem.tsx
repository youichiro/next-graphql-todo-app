import { ListItem, Checkbox } from '@chakra-ui/react';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
};

const TaskListItem: React.FC<Props> = ({ task }) => {
  return (
    <ListItem key={task.id}>
      <Checkbox isChecked={task.done}>{task.title}</Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
