const { gql } = require('apollo-server-express');

module.exports = gql`
  type AuthPayload {
    token: String
    user: User
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
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

  type Query {
    getAllUsers: [User!]
    getUser(id: ID!): User
  }
  
  type Mutation {
    signup(user: NewUserInput): User
    login(user: LoginUserInput): User
  }
`;