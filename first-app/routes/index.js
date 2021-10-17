const express = require('express');

const dockerCommandsRepository = require('../lib/dockerCommandsRepository');
const DockerCommandModel = require('../models/dockerCommand');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  dockerCommandsRepository.getDockerCommands((err, commands) => {
    res.render('index', { dockerCommands: commands });
  });
});

/* GET new command page */
router.get('/newcommand', (req, res) => {
  res.render('newcommand');
});

router.post('/newcommand', (req, res) => {
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

  command.save((err, cmd) => {
    if (err) return console.error(err);

    console.log(`${cmd.command} saved to commands collection.`);
    res.redirect('/');

    return null;
  });
});

module.exports = router;
