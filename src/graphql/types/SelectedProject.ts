import { objectType, extendType, nonNull, intArg } from 'nexus';
import { Project } from './Project';
import { User } from './User';

export const SelectedProject = objectType({
  name: 'SelectedProject',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.field('user', {
      type: User,
      resolve(parent, _args, ctx) {
        return ctx.prisma.selectedProject
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user();
      },
    });
    t.nonNull.field('project', {
      type: Project,
      resolve(parent, _args, ctx) {
        return ctx.prisma.selectedProject
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

export const SelectedProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('selectedProject', {
      type: SelectedProject,
      args: {
        userId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.selectedProject.findUnique({
          where: {
            userId: args.userId,
          },
          include: {
            project: {
              include: {
                tasks: true,
              },
            },
          },
        });
      },
    });
  },
});

export const upsertSelectedProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('upsertSelectedProject', {
      type: SelectedProject,
      args: {
        userId: nonNull(intArg()),
        projectId: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.selectedProject.upsert({
          where: {
            userId: args.userId,
          },
          update: {
            projectId: args.projectId,
          },
          create: {
            userId: args.userId,
            projectId: args.projectId,
          },
        });
      },
    });
  },
});
