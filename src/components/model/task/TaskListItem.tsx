import { useMutation } from '@apollo/client';
import { ListItem, Checkbox } from '@chakra-ui/react';
import { useContext } from 'react';
import { UpdateTask } from '../../../graphql/mutations';
import { SelectedProjectQuery } from '../../../graphql/queries';
import { TaskContext } from './TaskContainer';
import { Task } from '.prisma/client';

type Props = {
  task: Task;
  setSelectedTask: (task: Task) => void;
  color?: string;
};

const TaskListItem: React.FC<Props> = ({ task, setSelectedTask, color }) => {
  const { selectedTask } = useContext(TaskContext);

  const [updateTask, mutation] = useMutation(UpdateTask, {
    refetchQueries: [SelectedProjectQuery],
  });

  const handleClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCheck = () => {
    const newTask: Task = {
      ...task,
      done: !task.done,
    };
    updateTask({
      variables: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        done: newTask.done,
      },
    });
    setSelectedTask(newTask);
  };

  if (mutation.error) return <p>Submission error! {mutation.error.message}</p>;

  return (
    <ListItem
      key={task.id}
      py='8px'
      px='16px'
      onClick={() => handleClick(task)}
      bg={selectedTask?.id === task.id ? 'gray.100' : ''}
      borderRadius='8px'
      color={color}
    >
      <Checkbox
        colorScheme='teal'
        isChecked={task.done}
        color={!task.title ? 'gray' : ''}
        onChange={() => handleCheck()}
      >
        {task.title || 'untitled'}
      </Checkbox>
    </ListItem>
  );
};

export default TaskListItem;
