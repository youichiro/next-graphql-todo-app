import { Box, Input, FormControl, Button, Stack } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';

type Props = {
  handleTaskCreate: (title: string, resetForm: () => void) => void;
};

const TaskCreateForm: React.FC<Props> = ({ handleTaskCreate }) => {
  return (
    <Box>
      <Formik
        initialValues={{ taskName: '' }}
        onSubmit={(value, actions) => handleTaskCreate(value.taskName, actions.resetForm)}
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
