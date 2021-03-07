const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthPayload {
    token: Token
    user: User
  }

  type Token {
    token: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    groups: [Group!]!
    tasks: [Task!]!
    createdAt: String!
    updatedAt: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input NewUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Query {
    getAllUsers: [User!]!
    getUser(id: ID!): User
    # getUserTasks(id: ID!): [Task!]!
    # getUserGroups(id: ID!): [Group!]!
  }

  extend type Mutation {
    deleteUser(id: ID!): Boolean!
    signup(user: NewUserInput): Token!
    login(user: LoginUserInput): Token!
  }
`;