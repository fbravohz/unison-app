'use strict';

const mysql = require('promise-mysql');

const createUnixSocketPool = async () => {
    return mysql.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
    });
};

module.exports = createUnixSocketPool;