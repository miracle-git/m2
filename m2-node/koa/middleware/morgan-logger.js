const path = require('path');
const fs = require('fs');
const logger = require('koa-morgan');
const env = process.env.NODE_ENV;

const middleware = {
  defaultLogger: async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  },
  morganLogger: (fileName) => {
    if (env === 'development' || env === 'dev') {
      return logger('dev');
    }
    fileName = path.join(__dirname, '../../../../', fileName);
    const ws = fs.createWriteStream(fileName, { flags: 'a' });
    return logger('combined', { stream: ws });
  }
}

module.exports = middleware;
