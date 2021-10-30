import { AddIcon } from '@chakra-ui/icons';
import { Center, IconButton } from '@chakra-ui/react';

type Props = {
  handleCreateProject: () => void
};

const ProjectCreateButton: React.FC<Props> = ({ handleCreateProject }) => {
  return (
    <Center>
      <IconButton
        aria-label='project create button'
        icon={<AddIcon />}
        colorScheme='gray'
        size='xs'
        onClick={() => handleCreateProject()}
      />
    </Center>
  );
};

export default ProjectCreateButton;
