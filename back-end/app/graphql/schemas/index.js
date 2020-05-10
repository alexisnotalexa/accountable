const { gql } = require('apollo-server-express');
const groupSchema = require('./group');
const taskSchema = require('./task');
const userSchema = require('./user');

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, groupSchema, taskSchema, userSchema];