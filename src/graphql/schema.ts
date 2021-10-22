import { join } from 'path';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { permissions } from './permissions';
import * as types from './types';

export const baseSchema = makeSchema({
  types,
  outputs: {
    typegen: join(process.cwd(), 'node_modules', '@types', 'nexus-typegen', 'index.d.ts'),
    schema: join(process.cwd(), 'src', 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'src', 'graphql', 'context.ts'),
  },
});

export const schema = applyMiddleware(baseSchema, permissions);
