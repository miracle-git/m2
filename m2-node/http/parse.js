const qs = require('querystring');
const { getPostData } = require('./post');

const parseQuery = (req) => {
  const { url } = req;
  req.path = url.split('?')[0];
  req.query = qs.parse(url.split('?')[1]);
};

const parseCookie = (req) => {
  req.cookie = {};
  const { headers } = req;
  const _cookie = headers.cookie || '';
  _cookie.split(';').forEach(item => {
    if (!item) return;
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
};

/*
const parseSession = (req, sessionData, needCookie) => {
  const { sid } = req.cookie;
  if (sid) {
    if (!sessionData[sid]) {
      sessionData[sid] = {};
    }
  } else {
    needCookie = true;
    sid = `${Date.now()}_${Math.random()}`;
    sessionData[sid] = {};
  }
  req.session = {
    id: sid,
    data: sessionData[sid]
  };
}*/

const parseSession = (req, redis) => {
  let { sid } = req.cookie;
  if (!sid) {
    req.needCookie = true;
    sid = `${Date.now()}_${Math.random()}`;
    redis.set(sid, {});
  }

  // 设置session
  req.session = {
    id: sid
  };

  return redis.get(sid).then(res => {
    if (res == null) {
      // 设置redis的session
      redis.set(sid, {});
    } else {
      req.session = {
        ...req.session,
        data: res
      };
    }

    return getPostData(req);
  });
};

module.exports = {
  parseQuery,
  parseCookie,
  parseSession
};
