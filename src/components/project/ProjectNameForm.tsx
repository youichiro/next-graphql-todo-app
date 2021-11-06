import { useMutation } from '@apollo/client';
import { Input } from '@chakra-ui/react';
import { UpdateProject } from '../../graphql/mutations';
import { ProjectsQuery } from '../../graphql/queries';

type Props = {
  userId: number;
  projectId: number;
  name: string;
  setName: (name: string) => void;
  setEditable: (boolean: boolean) => void;
};

const ProjectNameForm: React.FC<Props> = (props) => {
  const [updateProject, mutation] = useMutation(UpdateProject, {
    refetchQueries: [ProjectsQuery],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    props.setName(name);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    updateProject({ variables: { userId: props.userId, id: props.projectId, name: name } });
    props.setName(name);
    props.setEditable(false);
  };

  if (mutation.error) return <p>{mutation.error.message}</p>;

  return (
    <Input
      name='name'
      variant='flushed'
      value={props.name}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder='Project Name'
    />
  );
};

export default ProjectNameForm;
