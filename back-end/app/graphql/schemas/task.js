const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    _id: ID!
    description: String!
    groupId: ID!
    createdAt: String!
    updatedAt: String!
  }
`;