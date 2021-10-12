import { objectType, extendType, nonNull, intArg, stringArg } from 'nexus';
import { Task } from './Task';
import { User } from './User';

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.field('user', {
      type: User,
      resolve(parent, _args, ctx) {
        return ctx.prisma.project
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user();
      },
    });
    t.nonNull.list.field('tasks', {
      type: Task,
      resolve(parent, _args, ctx) {
        return ctx.prisma.project
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .tasks();
      },
    });
  },
});

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('projects', {
      type: Project,
      args: {
        userId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.project.findMany({
          where: {
            userId: {
              equals: args.userId,
            },
          },
        });
      },
    });
  },
});

export const CreateProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProject', {
      type: Project,
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.project.create({
          data: {
            name: args.name,
            user: {
              connect: {
                id: args.userId,
              },
            },
          },
        });
      },
    });
  },
});
