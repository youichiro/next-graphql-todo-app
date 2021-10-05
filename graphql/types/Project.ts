import { objectType, extendType, nonNull, intArg } from 'nexus'
import { User } from './User'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.int('id')
    t.string('name')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
      },
    })
  },
})

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('projects', {
      type: Project,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.project.findMany()
      },
    })
  },
})

export const CreateProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createProject', {
      type: Project,
      args: {
        userId: nonNull(intArg()),
      },
      resolve(_parent, _args, ctx) {
        const project = ctx.prisma.project.create({
          data: {
            name: 'project created by mutation',
            userId: _args.userId,
          }
        })
        return project
      },
    })
  },
})
