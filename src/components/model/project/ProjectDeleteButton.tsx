import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { DeleteProject } from '../../../graphql/mutations';
import { ProjectsQuery } from '../../../graphql/queries';

type Props = {
  projectId: number;
};

const ProjectDeleteButton: React.FC<Props> = (props) => {
  const [deleteProject, mutation] = useMutation(DeleteProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.stopPropagation();
     const check = window.confirm('Delete this project');
     if (check) {
       deleteProject({ variables: { id: props.projectId } });
     }
  }

  if (mutation.error) return <p>{mutation.error.message}</p>;

  return (
    <IconButton
      aria-label='delete project button'
      icon={<DeleteIcon />}
      size='xs'
      bg='none'
      _hover={{ color: 'red' }}
      _focus={{ boxShadow: 'none' }}
      onClick={handleClick}
    />
  );
};

export default ProjectDeleteButton;
