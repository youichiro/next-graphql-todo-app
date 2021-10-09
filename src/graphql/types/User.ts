import { objectType, extendType, nonNull, stringArg } from 'nexus';
import { Project } from './Project';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.string('email');
    t.string('image');
    t.list.field('projects', {
      type: Project,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .projects();
      },
    });
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});

export const CreateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: User,
      args: {
        name: nonNull(stringArg()),
        email: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
          },
        });
      },
    });
  },
});
