const logger = require('./logger');

let env = process.env.NODE_ENV;

if (!env) {
  env = 'development';
}

logger.log(`Node environment: ${env}`);
logger.log(`loading config.${env}.json`);

// eslint-disable-next-line
const config = require(`../config/config.${env}.json`);

module.exports = config;
