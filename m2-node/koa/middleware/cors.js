const middleware = (headers = '') => {
  const allowHeaders = ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With'];
  if (headers) {
    allowHeaders.push(headers.split(','));
  }
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', allowHeaders.join(', '));
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method === 'OPTIONS') {
      ctx.body = 200;
    } else {
      await next();
    }
  }
};

module.exports = middleware;
