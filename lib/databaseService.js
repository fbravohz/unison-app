/**
 * It returns a connection to the database
 * @returns A knex object.
 */
function databaseConnection() {
  /* Creating a connection to the database. */
  const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
  return knex;
}
/* Exporting the function `databaseConnection` so that it can be used in other files. */
module.exports.databaseConnection = databaseConnection;