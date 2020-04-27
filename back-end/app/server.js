const bodyParser = require('body-parser');
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const graphqlHttp = require('express-graphql');
const graphqlResolvers = require('./graphql/resolvers');
const graphqlSchema = require('./graphql/schemas');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

const User = require('./models/user');
const URI = `mongodb+srv://${config[env].username}:${config[env].password}@accountable-ei8ox.mongodb.net/test?retryWrites=true&w=majority`;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, OPTIONS)
    .then(() => {
        console.log('[MongoDB connection] SUCCESS');
        for(let i = 0; i < 5; i++) {
            var user = new User({
                firstName: `test-firstName-${i}`,
                lastName: `test-lastName-${i}`,
                email: `test+${i}@test.com`,
                password: `test${i}`
            });
            user.save((error, doc) => {
                console.log('[MongoDB] Test record saved with id: ' + doc._id);
            });
        }
        app.listen(config[env].port, () => {
            console.log(`SERVER: Listening on ${config[env].port}`);
        });
    })
    .catch(error => {
        console.log(`[MongoDB connection] ERROR: ${error}`);
        throw error;
    });

// app.listen(config[env].port, async () => {
//     console.log(`SERVER: Listening on ${config[env].port}`);

//     db.initialize(dbName, dbCollectionName, (collection) => {
//         collection.find().toArray((error, result) => {
//             if (error) throw error;
//             console.log('[MongoDB]', result);
//         });
//     }, (error) => { throw error });
// });
