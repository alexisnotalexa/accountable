const userResolvers = require('./user');
const groupResolvers = require('./group');

module.exports = [groupResolvers, userResolvers];