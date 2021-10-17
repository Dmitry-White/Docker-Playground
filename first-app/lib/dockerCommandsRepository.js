const DockerCommand = require('../models/dockerCommand');

const dockerCommandsRepository = (() => {
  const getDockerCommands = (callback) => {
    DockerCommand.find((err, commands) => {
      if (err) return callback(err, null);

      return callback(err, commands);
    });
  };

  return {
    getDockerCommands,
  };
})();

module.exports = dockerCommandsRepository;
