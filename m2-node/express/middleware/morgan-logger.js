const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const env = process.env.NODE_ENV;

const middleware = (fileName) => {
  if (env === 'development' || env === 'dev') {
    return logger('dev');
  }
  fileName = path.join(__dirname, '../../../../', fileName);
  const ws = fs.createWriteStream(fileName, { flags: 'a' });
  return logger('combined', { stream: ws });
};

module.exports = middleware;
