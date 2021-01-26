const createError = require('http-errors');

const middleware = {
  notFoundError: (req, res, next) => {
    next(createError(404));
  },
  serverError: (err, req, res, next) => {
    // set locals, only providing error in development
    const env = req.app.get('env');
    res.locals.message = err.message;
    res.locals.error = env === 'development' || env === 'dev'  ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
};

module.exports = middleware;
