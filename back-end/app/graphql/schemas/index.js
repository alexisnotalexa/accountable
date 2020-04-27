const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]
  }

  type Mutation {
    createUser(user: UserInput): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);