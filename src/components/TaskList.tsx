import { gql, useQuery } from '@apollo/client';
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useSession } from 'next-auth/client';
import { Task } from '.prisma/client';

const SelectedProjectQuery = gql`
  query SelectedProject($userId: Int!) {
    selectedProject(userId: $userId) {
      project {
        tasks {
          id
          title
        }
      }
    }
  }
`;
const TaskList: React.FC = () => {
  const [session, _] = useSession();
  const { data, loading, error } = useQuery(SelectedProjectQuery, {
    variables: { userId: session.userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  return (
    <List>
      {data.selectedProject.project.tasks.map((task: Task) => (
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
