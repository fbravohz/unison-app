'use strict';

const mysql = require('promise-mysql');

const createTcpPool = async () => {

  const dbConfig = {
    host: process.env.DB_INSTANCE_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  };

  return mysql.createPool(dbConfig);
};

module.exports = createTcpPool;