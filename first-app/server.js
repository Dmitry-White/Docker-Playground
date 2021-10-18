const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const config = require('./libs/configLoader');
const db = require('./libs/database');
const hbs = require('./libs/viewEngine');
const { logger, accessLogStream } = require('./libs/logger');
const routes = require('./routes');
const { renderError, handleNotFoundRoute } = require('./middlewares/error');

const port = process.env.PORT || 3000;

const app = express();

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('combined', { stream: accessLogStream }));

app.use(favicon(`${__dirname}/public/images/favicon.ico`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// error handlers
app.use(handleNotFoundRoute);
app.use(renderError(app));

// Pass database config settings
db.init(config.databaseConfig);

app.listen(
  port,
  logger.info('[%s] Listening on http://localhost:%d', app.settings.env, port),
);

//* ********************************************************
//    Quick and dirty way to detect event loop blocking
//* ********************************************************
let lastLoop = Date.now();

const monitorEventLoop = () => {
  const time = Date.now();
  if (time - lastLoop > 1000)
    logger.error(`Event loop blocked ${time - lastLoop}`);
  lastLoop = time;
  setTimeout(monitorEventLoop, 200);
};

if (process.env.NODE_ENV === 'development') {
  monitorEventLoop();
}

module.exports = app;
