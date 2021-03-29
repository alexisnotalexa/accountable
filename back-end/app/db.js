const mongoose = require('mongoose');
const config = require('./config/config.json');
const env = process.env.NODE_ENV || 'development';

const URI = `mongodb+srv://${config[env].username}:${config[env].password}@accountable.ei8ox.mongodb.net/test?retryWrites=true&w=majority`;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };

const initialize = (app) => {
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
};

module.exports = {
  initialize
};