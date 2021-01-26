const mysql = require('mysql');

const connect = (config) => {
  const connection = mysql.createConnection(config);
  if (!connection) {
    console.error('Mysql connection config has error, please check and try again.');
    return;
  }
  return connection;
};

const escape = mysql.escape; // 防sql注入攻击

const execSql = (connection, sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  connect,
  escape,
  execSql
};
