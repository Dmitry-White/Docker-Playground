const mongoose = require('mongoose');

const { logger } = require('./logger');

const database = (() => {
  let conn = null;

  const init = (config) => {
    logger.info(
      `Trying to connect to ${config.host}/${config.database} MongoDB database`,
    );

    const options = {
      promiseLibrary: global.Promise,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const connString = `mongodb://${config.host}/${config.database}`;

    mongoose.connect(connString, options);

    conn = mongoose.connection;
    conn.on('error', (err) => logger.error('connection error:', err));
    conn.once('open', () => logger.info('db connection open'));

    return conn;
  };

  const close = () => {
    if (conn) {
      conn.close(() => {
        logger.info(
          'Mongoose default connection disconnected through app termination',
        );
        process.exit(0);
      });
    }
  };

  return {
    init,
    close,
  };
})();

module.exports = database;
