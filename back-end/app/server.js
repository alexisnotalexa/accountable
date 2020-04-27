const bodyParser = require('body-parser');
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db');
const dbName = 'accountable-data';
const dbCollectionName = 'users';

app.listen(config[env].port, async () => {
    console.log(`SERVER: Listening on ${config[env].port}`);

    db.initialize(dbName, dbCollectionName, (collection) => {
        collection.find().toArray((error, result) => {
            if (error) throw error;
            console.log('[MongoDB]', result);
        });
    }, (error) => { throw error });
});
