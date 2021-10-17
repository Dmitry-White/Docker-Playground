const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const port = process.env.PORT || 3000;
const config = require('./lib/configLoader');
const db = require('./lib/database');

const routes = require('./routes/index');

const app = express();

// view engine setup
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'masterLayout',
  // https://www.npmjs.com/package/@handlebars/allow-prototype-access
  // Need to add due to security change in Handlebars 4.6+
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '/logs/access.log'),
  { flags: 'a' },
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(favicon(`${__dirname}/public/images/favicon.ico`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pass database config settings
db.init(config.databaseConfig);

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error,
  });
  next();
});

app.listen(port, () => {
  console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});

//* ********************************************************
//    Quick and dirty way to detect event loop blocking
//* ********************************************************
let lastLoop = Date.now();

const monitorEventLoop = () => {
  const time = Date.now();
  if (time - lastLoop > 1000)
    console.error(`Event loop blocked ${time - lastLoop}`);
  lastLoop = time;
  setTimeout(monitorEventLoop, 200);
};

if (process.env.NODE_ENV === 'development') {
  monitorEventLoop();
}

module.exports = app;
