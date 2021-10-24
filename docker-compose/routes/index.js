const express = require('express');

const {
  renderCommandPage,
  addNewCommand,
  renderHomePage,
} = require('../controllers/command');

const router = express.Router();

/* GET home page. */
router.get('/', renderHomePage);

/* GET command page */
router.get('/newcommand', renderCommandPage);

router.post('/newcommand', addNewCommand);

module.exports = router;
