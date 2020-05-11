const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    _id: ID!
    description: String!
    groupId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input NewTaskInput {
    description: String!
    groupId: ID!
  }

  input UpdateTaskInput {
    taskId: ID!
    description: String!
    groupId: ID
  }

  extend type Query {
    getAllTasksForGroup(groupId: ID!): [Task!]
    getAllTasksForUser(userId: ID!): [Task!]
  }

  extend type Mutation {
    createTask(task: NewTaskInput): Task!
    updateTask(task: UpdateTaskInput): Task!
    deleteTask(id: ID!): Boolean!
  }
`;