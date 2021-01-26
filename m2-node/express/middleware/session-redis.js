const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const middleware = (redis, { secret = '', path = '/', httpOnly = true, maxAge } = {}) => {
  const store = new RedisStore(redis);
  return session({
    secret,
    cookie: {
      path,
      httpOnly,
      maxAge
    },
    store
  });
};

module.exports = middleware;
