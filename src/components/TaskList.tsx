import { gql, useQuery } from '@apollo/client';
import { List } from '@chakra-ui/react'
import { useContext } from 'react';
import { SessionContext } from '../pages';
import TaskListItem from './TaskListItem';
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
  const { session } = useContext(SessionContext);
  const { data, loading, error } = useQuery(SelectedProjectQuery, {
    variables: { userId: session.userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error.message}</p>;

  if (!data.selectedProject) return <p>Select your project.</p>;

  return (
    <List>
      {data.selectedProject.project.tasks.map((task: Task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </List>
  );
};

export default TaskList;
