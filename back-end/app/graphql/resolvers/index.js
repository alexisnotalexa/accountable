const groupResolvers = require('./group');
const taskResolvers = require('./task');
const userResolvers = require('./user');

module.exports = [groupResolvers, taskResolvers, userResolvers];