const getCookieExpire = ({ type ='d', offset = 1 } = {}) => {
  const date = new Date();
  let delta = 0;
  switch (type.toLowerCase()) {
    case 'm':
    case 'minute':
      delta = offset * 60 * 1000;
      break;
    case 'h':
    case 'hour':
      delta = offset * 60 * 60 * 1000;
      break;
    case 'd':
    case 'day':
    default:
      delta = offset * 24 * 60 * 60 * 1000;
      break;
  }
  date.setTime(date.getTime() + delta);
  return date.toGMTString();
};

const setServerCookie = (res, key, val, options = {}) => {
  const _kv = { [key]: val, path: '/', expires: getCookieExpire(), ...options };
  const _val = Object.keys(_kv).reduce((item, key) => item += `${key}=${_kv[key]};`, '');
  res.setHeader('Set-Cookie', `${_val};httpOnly`);
};

module.exports = {
  getCookieExpire,
  setServerCookie
};
