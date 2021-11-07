import { useMutation } from '@apollo/client';
import { Box, Input, FormControl, Button, Stack } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { CreateTask } from '../../../graphql/mutations';
import { SelectedProjectQuery } from '../../../graphql/queries';

type Props = {
  projectId: number;
};

const TaskCreateForm: React.FC<Props> = (props) => {
  const [createTask, mutation] = useMutation(CreateTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  const handleSubmit = (title: string, resetForm: () => void) => {
    if (title) {
      createTask({
        variables: {
          projectId: props.projectId,
          title: title,
          description: '',
        },
      });
      resetForm();
    }
  };

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  return (
    <Box>
      <Formik
        initialValues={{ taskName: '' }}
        onSubmit={(value, actions) => handleSubmit(value.taskName, actions.resetForm)}
      >
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
export default TaskCreateForm;
