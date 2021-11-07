import { Heading, Stack } from '@chakra-ui/react';

type Props = {
  projectName: string;
};

const TaskProjectHeading: React.FC<Props> = ({ projectName }) => {
  return (
    <Stack direction='row' justifyContent='space-between' align='center'>
      <Heading size='md'>{projectName}</Heading>
    </Stack>
  );
};

export default TaskProjectHeading;
