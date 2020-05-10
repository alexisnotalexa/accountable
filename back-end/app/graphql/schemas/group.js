const { gql } = require('apollo-server-express');

module.exports = gql`
  type Group {
    _id: ID!
    name: String!
    createdBy: ID!
    createdAt: String!
    updatedAt: String!
  }

  input NewGroupInput {
    name: String!
    createdBy: ID!
  }

  extend type Query {
    getAllGroups: [Group!]
    getGroupsByUserId(userId: ID!): [Group!]
    getGroupsCreatedByUser(userId: ID!): [Group!]
  }

  extend type Mutation {
    createGroup(group: NewGroupInput): Group!
    updateGroup(id: ID!, name: String): Group!
    deleteGroup(id: ID!): Boolean!
  }
`;