import { booleanArg, extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { Project } from './Project';

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.string('description');
    t.nonNull.boolean('done');
    t.nonNull.field('project', {
      type: Project,
      resolve(parent, _args, ctx) {
        return ctx.prisma.task
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .project();
      },
    });
  },
});

export const TaskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('tasks', {
      type: Task,
      args: {
        projectId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.findMany({
          where: {
            projectId: {
              equals: args.projectId,
            },
          },
        });
      },
    });
  },
});

export const CreateTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTask', {
      type: Task,
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        projectId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            project: {
              connect: {
                id: args.projectId,
              },
            },
          },
        });
      },
    });
  },
});

export const UpdateTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateTask', {
      type: Task,
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        done: nonNull(booleanArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.title,
            description: args.description,
            done: args.done,
          },
        });
      },
    });
  },
});
