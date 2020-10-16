const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const dbMongo = mongoose.connection;
  dbMongo.on('error', console.error.bind(console, 'connection error:'));
  dbMongo.once('open', () => {
    console.log("we're connected!");
    cb();
  });
};

module.exports = connectToDB;
