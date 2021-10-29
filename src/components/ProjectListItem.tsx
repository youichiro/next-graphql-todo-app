import { ListItem } from '@chakra-ui/react';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  handleClick: (projectId: number) => void;
};

const ProjectListItem: React.FC<Props> = ({ project, selectedProjectId, handleClick }) => {
  const isSelected = project.id === selectedProjectId
  return (
    <ListItem key={project.id} px='16px' py='8px' bg={isSelected ? 'gray.300' : ''}
      onClick={() => handleClick(project.id)}
    >
      {project.name}
    </ListItem>
  );
};

export default ProjectListItem;
