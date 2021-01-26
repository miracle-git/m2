const middleware = (err, ctx) => {
  console.error('server error', err, ctx);
}

module.exports = middleware;
