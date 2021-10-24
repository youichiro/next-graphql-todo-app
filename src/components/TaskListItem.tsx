import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
};

const TaskListItem: React.FC<Props> = ({ task }) => {
  return (
    <ListItem key={task.id} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge='start' checked={task.done} disableRipple />
        </ListItemIcon>
        <ListItemText primary={task.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default TaskListItem;
