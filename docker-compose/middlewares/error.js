// catch 404 and forward to error handler
const handleNotFoundRoute = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// error handling middleware
// prints stacktrace in development
const renderError = (app) => (err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error,
  });

  next();
};

module.exports = {
  handleNotFoundRoute,
  renderError,
};
