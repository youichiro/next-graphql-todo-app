import { ListItem } from '@chakra-ui/react';
import { Project } from '.prisma/client';

type Props = {
  project: Project;
  selectedProjectId: number | null;
  handleClick: (projectId: number) => void;
};

const ProjectListItem: React.FC<Props> = ({ project, selectedProjectId, handleClick }) => {
  return (
    <ListItem
      onClick={() => handleClick(project.id)}
      // selected={project.id === selectedProjectId}
    >
      {project.name}
    </ListItem>
  );
};

export default ProjectListItem;
