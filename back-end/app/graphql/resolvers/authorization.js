const { ForbiddenError } = require('apollo-server-express');
const { combineResolvers, skip } = require('graphql-resolvers');

const isAuthenticated = (_, args, { authUser }) =>
  authUser ? skip : new ForbiddenError('Please login to have access.');

const isAdmin = combineResolvers(
  isAuthenticated,
  (_, args, { authUser: { role } }) =>
    role === 'admin'
      ? skip
      : new ForbiddenError('You must be an admin to perform this action')
);

module.exports = {
  isAdmin,
  isAuthenticated
};