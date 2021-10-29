import { Box, Input, FormControl, Button, Stack } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';

const TaskForm: React.FC = () => {
  return (
    <Box p='16px'>
      <Formik initialValues={{ taskName: '' }} onSubmit={() => null}>
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
