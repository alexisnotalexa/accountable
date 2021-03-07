const { MongoClient } = require('mongodb');
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';

const URI = `mongodb+srv://${config[env].username}:${config[env].password}@accountable.ei8ox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const initialize = (dbName, dbCollectionName, successCB, failureCB) => {
  MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error, db) => {
    if (error) {
      console.log(`[MongoDB connection] ERROR: ${error}`);
      failureCB(error);
    } else {
      const database = db.db(dbName);
      const collection = database.collection(dbCollectionName);
      console.log('[MongoDB connection] SUCCESS');

      successCB(collection);
    }
  });
};

module.exports = {
  initialize
};