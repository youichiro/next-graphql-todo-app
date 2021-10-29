import { Box, Flex } from '@chakra-ui/react';
import Account from '../components/Account';
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';

const HomeLayout: React.FC = () => {
  return (
    <Flex h='100vh'>
      <Flex w='300px' bg='gray.100' direction='column'>
        <Box>
          <Account />
        </Box>
        <Box flex='1'>
          <ProjectList />
        </Box>
      </Flex>
      <Box flex='1'>
        <TaskList />
      </Box>
      <Box flex='1' borderLeft='solid 1px gray' p='16px'>
        <div>Task Detail</div>
      </Box>
    </Flex>
  );
};

export default HomeLayout;
