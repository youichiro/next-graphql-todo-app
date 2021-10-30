import { Task } from '.prisma/client';

export const sortTask = (tasks: Task[]): Task[] => {
  const tasksArray = [...tasks]
  if (tasksArray.length < 2) {
    return tasksArray;
  }
  return tasksArray.sort((a: Task, b: Task) => {
    return b.id - a.id;
  });
};
