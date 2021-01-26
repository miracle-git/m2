const redis = require('redis');

const connect = (config) => {
  const client = redis.createClient(config.port, config.host);
  client.on('error', (err) => console.error(err));
  return client;
}

const setItem = (client, key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  client.set(key, val, redis.print);
};

const getItem = (client, key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        console.error(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });
};

const delItem = (client, key) => {
  client.del(key);
};

module.exports = {
  connect,
  setItem,
  getItem,
  delItem
};
