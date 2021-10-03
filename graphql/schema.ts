import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Project {
    id: Int
    name: String
  }

  type Query {
    projects: [Project]!
  }
`
