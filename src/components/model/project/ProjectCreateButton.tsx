import { useMutation } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Center, IconButton } from '@chakra-ui/react';
import { CreateProject } from '../../../graphql/mutations';
import { ProjectsQuery } from '../../../graphql/queries';

type Props = {
  userId: number;
};

const ProjectCreateButton: React.FC<Props> = ({ userId }) => {
  const [createProject, mutation] = useMutation(CreateProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleClick = () => {
    createProject({ variables: { userId: userId, name: 'new project' } });
  };

  if (mutation.error) return <p>{mutation.error.message}</p>;

  return (
    <Center>
      <IconButton
        aria-label='project create button'
        icon={<AddIcon />}
        colorScheme='gray'
        size='xs'
        onClick={() => handleClick()}
      />
    </Center>
  );
};

export default ProjectCreateButton;
