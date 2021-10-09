import { gql, useQuery } from '@apollo/client';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const TasksQuery = gql`
  query Tasks($projectId: Int!) {
    tasks(projectId: $projectId) {
      id
      title
      done
    }
  }
`;
const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(TasksQuery, {
    variables: { projectId: 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  return (
    <List>
      {data.tasks.map((task) => (
        <ListItem key={task.id} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox edge='start' checked={task.done} disableRipple />
            </ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
