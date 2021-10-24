const config = require('./config/config.development.json');
const dataInitializer = require('./libs/dataSeeder');
const { logger } = require('./libs/logger');
const db = require('./libs/database');

db.init(config.databaseConfig);

(async () => {
  logger.info('Initializing Data');

  await dataInitializer.initializeData();

  logger.info('Data Initialized!');
})();
