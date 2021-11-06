import { Box, Flex } from '@chakra-ui/react';
import Account from '../components/account/Account';
import ProjectContainer from '../components/project/ProjectContainer';
import TaskContainer from '../components/task/TaskContainer';

const HomeLayout: React.FC = () => {
  return (
    <Flex h='100vh'>
      <Flex w='300px' bg='gray.100' direction='column'>
        <Box>
          <Account />
        </Box>
        <Box flex='1'>
          <ProjectContainer />
        </Box>
      </Flex>
      <Box flex='1'>
        <TaskContainer />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
