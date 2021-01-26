const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    const { method, headers } = req;
    if (method !== 'POST' || headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

module.exports = {
  getPostData
};
