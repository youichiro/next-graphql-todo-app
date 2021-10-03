import { objectType, extendType } from 'nexus'
import { Project } from './Project'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.list.field('projects', {
      type: Project,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .projects()
      },
    })
  },
})
