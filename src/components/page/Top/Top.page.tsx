import { Box, Flex } from "@chakra-ui/react";
import Account from "../../account/Account";
import ProjectContainer from "../../project/ProjectContainer";
import TaskContainer from "../../task/TaskContainer";

const TopPage: React.FC = () => {
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
}

export default TopPage
