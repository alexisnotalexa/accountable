const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Status {
    COMPLETE
    INCOMPLETE
  }

  type Task {
    _id: ID!
    description: String!
    status: Status!
    group: Group!
    createdBy: User!
    completedBy: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  input NewTaskInput {
    description: String!
    groupId: ID!
  }

  extend type Query {
    getAllTasksForGroup(groupId: ID!): [Task!]
    getAllTasksForUser(userId: ID!): [Task!]
  }

  extend type Mutation {
    createTask(task: NewTaskInput): Task!
    updateTask(taskId: ID!, description: String!): Task!
    updateTaskGroup(taskId: ID!, groupId: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`;