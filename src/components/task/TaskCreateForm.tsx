import { Box, Input, FormControl, Button, Stack } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';

type Props = {
  handleSubmit: (title: string, resetForm: () => void) => void;
};

const TaskCreateForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <Box mx='16px' mt='16px'>
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