const DockerCommand = require('../models/dockerCommand');
const { logger } = require('./logger');

const dockerCommandsRepository = (() => {
  const getDockerCommands = async () => {
    try {
      const commands = await DockerCommand.find().exec();
      return commands;
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  };

  return {
    getDockerCommands,
  };
})();

module.exports = dockerCommandsRepository;
