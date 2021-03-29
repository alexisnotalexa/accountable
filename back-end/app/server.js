const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const config = require('./config/config.json');
const cors = require('cors');
const db = require('./db');
const express = require('express');
const jwt = require('jsonwebtoken');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');

// SERVER
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const isAuthorized = async req => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            return await jwt.verify(token, config.SECRET);
        } catch(error) {
            throw new AuthenticationError('Your session has expired. Login again.');
        }
    }
};

// APOLLO-SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    graphiql: true,
    context: async ({ req }) => {
        const authUser = await isAuthorized(req);
        return {
            authUser,
            secret: config.SECRET
        }
    }
});

server.applyMiddleware({ app, path: '/graphql' });

// DATABASE
db.initialize(app);