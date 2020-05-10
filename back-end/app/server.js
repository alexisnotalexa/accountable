const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const bodyParser = require('body-parser');
const config = require('./config/config.json');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// SERVER
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
        const user = await isAuthorized(req);
        return {
            authUser,
            secret: config.SECRET
        }
    }
});

server.applyMiddleware({ app, path: '/graphql' });

// DATABASE
const URI = `mongodb+srv://${config[env].username}:${config[env].password}@accountable-ei8ox.mongodb.net/test?retryWrites=true&w=majority`;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, OPTIONS)
    .then(() => {
        console.log('[MongoDB connection] SUCCESS');
        app.listen(config[env].port, () => {
            console.log(`[SERVER] Listening on ${config[env].port}`);
        });
    })
    .catch(error => {
        console.log(`[MongoDB connection] ERROR: ${error}`);
        throw error;
    });