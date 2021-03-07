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
    createdBy: ID!
  }

  extend type Query {
    getAllGroups: [Group!]
    getGroupsByUserId(userId: ID!): [Group!]
    getGroupsCreatedByUser(userId: ID!): [Group!]
  }

  extend type Mutation {
    addGroupMember(groupId: ID!, userId: ID!): Boolean!
    createGroup(group: NewGroupInput): Group!
    deleteGroup(id: ID!): Boolean!
    removeGroupMember(groupId: ID!, userId: ID!): Boolean!
    updateGroup(id: ID!, name: String): Group!
  }
`;