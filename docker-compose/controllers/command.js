const { logger } = require('../libs/logger');
const dockerCommandsRepository = require('../libs/dockerCommandsRepository');
const DockerCommandModel = require('../models/dockerCommand');

const renderHomePage = async (req, res) => {
  const commands = await dockerCommandsRepository.getDockerCommands();

  res.render('index', { dockerCommands: commands });
};

const renderCommandPage = (req, res) => {
  res.render('newcommand');
};

const addNewCommand = async (req, res) => {
  // Extremely simple implementation to get a command in the database
  const commandData = {
    command: req.body.command,
    description: req.body.description,
    examples: [
      {
        example: req.body.example,
        description: req.body.ex_description,
      },
    ],
  };
  const command = new DockerCommandModel(commandData);

  try {
    const cmd = await command.save();

    logger.info(`${cmd.command} saved to commands collection.`);
    res.redirect('/');
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
};

module.exports = {
  renderHomePage,
  renderCommandPage,
  addNewCommand,
};
