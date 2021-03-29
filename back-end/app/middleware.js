const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');

const checkToken = async req => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

    if (token) {
        try  {
            return await jwt.verify(token.replace('Bearer ', ''), config.SECRET);
        } catch (error) {
            console.log(error);
            throw new AuthenticationError('Your session has expired. Login again.');
        }
    }
    return null;
};

module.exports = {
    checkToken
};