import { gql, useQuery } from '@apollo/client';
import { List, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { SessionContext } from '../../pages';
import TaskListItem from './TaskListItem';
import { Task } from '.prisma/client';

type Props = {
  tasks: Task[]
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <Box>
      <List>
        {tasks.map((task: Task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
