const sessionRedis = require('./middleware/session-redis');
const { defaultLogger, morganLogger } = require('./middleware/morgan-logger');
const serverError = require('./middleware/error-handler');
const cors = require('./middleware/cors');

module.exports = {
  sessionRedis,
  defaultLogger,
  morganLogger,
  serverError,
  cors
};
