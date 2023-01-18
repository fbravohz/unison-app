const mysql = require('promise-mysql');

async function createTcpPool(){

  const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };

  return mysql.createPool(dbConfig);
};

module.exports = createTcpPool;