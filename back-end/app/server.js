const { ApolloServer } = require('apollo-server-express');
const { checkToken } = require('./middleware');
const config = require('./config/config.json');
const cors = require('cors');
const db = require('./db');
const express = require('express');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');

// SERVER
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// APOLLO-SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    graphiql: true,
    context: async ({ req }) => {
        const authUser = await checkToken(req);
        return {
            authUser,
            secret: config.SECRET
        }
    }
});

server.applyMiddleware({ app, path: '/graphql' });

// DATABASE
db.initialize(app);