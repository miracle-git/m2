const sessionRedis = require('./middleware/session-redis');
const morganLogger = require('./middleware/morgan-logger');
const { notFoundError, serverError } = require('./middleware/error-handler');

module.exports = {
  sessionRedis,
  morganLogger,
  notFoundError,
  serverError
};
