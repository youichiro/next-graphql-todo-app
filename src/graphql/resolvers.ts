export const resolvers = {
  Query: {
    projects: (_parent, _args, ctx) => {
      return ctx.prisma.project.findMany();
    },
  },
};
