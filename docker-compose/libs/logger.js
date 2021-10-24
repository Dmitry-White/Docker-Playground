const path = require('path');
const fs = require('fs');

const logger = (() => {
  const info = (...args) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  };

  const error = (...args) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.error(...args);
    }
  };

  return {
    info,
    error,
  };
})();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' },
);

module.exports = {
  logger,
  accessLogStream,
};
