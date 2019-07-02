const mongoose = require('mongoose');
const logger = require('./logger');

const CONNECTION_RETRIES = 10; // quit trying to connect after 10 tries.
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: CONNECTION_RETRIES,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const name = process.env.DB_NAME || 'warfortwo';
const URI = `mongodb://${host}:${port}/${name}`;

mongoose.Promise = global.Promise;
mongoose.connect(URI, options);
const mongoConnection = mongoose.connection;
mongoConnection.on('connected', () => logger.info(`Connected to MongoDB: ${name}`));