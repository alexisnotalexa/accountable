const { ForbiddenError } = require('apollo-server-express');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (_, args, { authUser }) =>
  authUser ? skip : new ForbiddenError('Please login to have access.');

module.exports = isAuthenticated;