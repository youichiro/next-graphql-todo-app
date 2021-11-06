import { List, Box, Text } from '@chakra-ui/react';
import ProjectListItem from './ProjectListItem';
import { Project, SelectedProject } from '.prisma/client';

type Props = {
  projects: Project[];
  selectedProject: SelectedProject | null;
  userId: number;
};

const ProjectList: React.FC<Props> = ({
  projects,
  selectedProject,
  userId,
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
            selectedProject={selectedProject}
            userId={userId}
          />
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;
