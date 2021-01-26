const fs = require('fs');
const rl = require('readline');

const readline = (fileName) => {
  const rs = fs.createReadStream(fileName);
  return rl.createInterface({
    input: rs
  });
};

const writeLog = (fileName, log) => {
  const ws = fs.createWriteStream(fileName, {
    flags: 'a'
  });
  ws.write(log + '\n');
};

module.exports = {
  readline,
  writeLog
};
