const crypto = require('crypto');

const md5 = (content) => {
  const _md5 = crypto.createHash('md5');
  return _md5.update(content).digest('hex');
};

const encryptPassword = (password, secureKey) => {
  return md5(`password=${password}&key=${secureKey}`);
};

module.exports = {
  md5,
  encryptPassword
};
