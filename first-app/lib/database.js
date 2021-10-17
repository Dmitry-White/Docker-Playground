const mongoose = require('mongoose');

const database = (() => {
  let conn = null;

  const init = (config) => {
    console.log(
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
    conn.on('error', (err) => console.error('connection error:', err));
    conn.once('open', () => console.log('db connection open'));

    return conn;
  };

  const close = () => {
    if (conn) {
      conn.close(() => {
        console.log(
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
