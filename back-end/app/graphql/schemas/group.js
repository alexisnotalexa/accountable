const { gql } = require('apollo-server-express');

module.exports = gql`
  type Group {
    _id: ID!
    name: String!
    description: String
    members: [User!]!
    tasks: [Task!]!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  input NewGroupInput {
    name: String!
    description: String
    members: [ID!]!
    createdBy: ID!
  }

  extend type Query {
    getAllGroups: [Group!]!
    getGroupsCreatedByUser(id: ID!): [Group!]!
  }

  extend type Mutation {
    createGroup(group: NewGroupInput): Group!
    deleteGroup(id: ID!): Boolean!
    updateGroup(id: ID!, name: String): Group!
  }
`;