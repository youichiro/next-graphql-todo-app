import { allow, and, deny, rule, shield } from 'graphql-shield';
import { getSession } from 'next-auth/client';

const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, { req }, _info) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  const session = await getSession({ req });
  return Boolean(session);
});

const isValidUserId = rule({ cache: 'contextual' })(async (_parent, args, { req }, _info) => {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  const session = await getSession({ req });
  return session && args.userId === session.userId;
});

export const permissions = shield(
  {
    Query: {
      '*': deny,
      projects: and(isAuthenticated, isValidUserId),
      selectedProject: and(isAuthenticated, isValidUserId),
    },
    Mutation: {
      '*': isAuthenticated,
    },
  },
  {
    fallbackRule: allow,
  },
);
