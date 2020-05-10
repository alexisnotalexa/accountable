const { gql } = require('apollo-server-express');
const userSchema = require('./user');
const groupSchema = require('./group');

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, groupSchema, userSchema];