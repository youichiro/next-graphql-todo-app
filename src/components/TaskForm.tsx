import { gql, useMutation, useQuery } from '@apollo/client';
import { Box, Input, FormControl, Button, Stack } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { useContext } from 'react';
import { SessionContext } from '../pages';

const SelectedProjectQuery = gql`
  query SelectedProject($userId: Int!) {
    selectedProject(userId: $userId) {
      project {
        id
      }
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($projectId: Int!, $title: String!) {
    createTask(projectId: $projectId, title: $title) {
      id
      title
      done
    }
  }
`;

const TaskForm: React.FC = () => {
  const { session } = useContext(SessionContext);
  const query = useQuery(SelectedProjectQuery, {
    variables: { userId: session.userId },
  });
  const [createTask, mutation] = useMutation(CREATE_TASK);

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>Loading error! {query.error.message}</p>;

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  const handleSubmit = (title: string) => {
    createTask({ variables: { projectId: query.data.selectedProject?.project.id, title: title } });
  };

  return (
    <Box p='16px'>
      <Formik initialValues={{ taskName: '' }} onSubmit={(value, _) => handleSubmit(value.taskName)}>
        <Form>
          <Stack direction='row' alignItems='center'>
            <Field name='taskName'>
              {({ field }) => (
                <FormControl>
                  <Input {...field} id='taskName' type='text' placeholder='Add task' />
                </FormControl>
              )}
            </Field>
            <Button colorScheme='teal' type='submit'>
              Submit
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
export default TaskForm;
