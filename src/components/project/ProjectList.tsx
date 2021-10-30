import { List, Box, Text } from '@chakra-ui/react';
import ProjectListItem from './ProjectListItem';
import { Project } from '.prisma/client';

type Props = {
  projects: Project[];
  selectedProjectId?: number;
  handleUpsertSelectedProject: (projectId: number) => void;
  handleUpdateProject: (id: number, name: string) => void
};

const ProjectList: React.FC<Props> = ({
  projects,
  selectedProjectId,
  handleUpsertSelectedProject,
  handleUpdateProject,
}) => {
  if (projects.length === 0) {
    return (
      <Box>
        <Text color='gray'>Select project.</Text>
      </Box>
    );
  }
  return (
    <Box>
      <List>
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            selectedProjectId={selectedProjectId}
            handleUpsertSelectedProject={handleUpsertSelectedProject}
            handleUpdateProject={handleUpdateProject}
          />
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;
