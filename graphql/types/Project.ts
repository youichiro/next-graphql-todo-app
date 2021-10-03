import { objectType, extendType } from 'nexus'
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
