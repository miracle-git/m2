const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const middleware = (redis, { path = '/', httpOnly = true, maxAge } = {}) => {
  return session({
    cookie: {
      path,
      httpOnly,
      maxAge
    },
    store: redisStore({
      all: `${redis.host}:${redis.port}`
    })
  });
};

module.exports = middleware;
