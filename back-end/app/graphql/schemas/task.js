const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    _id: ID!
    description: String!
    status: String!
    group: Group!
    createdBy: User!
    completedBy: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  input NewTaskInput {
    description: String!
    groupId: ID!
    userId: ID!
  }

  extend type Query {
    getAllTasks: [Task!]!
    getTask(id: ID!): Task!
  }

  extend type Mutation {
    createTask(task: NewTaskInput): Task!
    updateTask(taskId: ID!, description: String!): Task!
    # updateTaskGroup(taskId: ID!, groupId: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;