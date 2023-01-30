/**
 * It returns a connection to the database
 * @returns A knex object.
 */
function databaseConnection() {
  /* Creating a connection to the database. */
  const knex = require("knex")({
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "toortoor",
      database: "abssa_app",
    },
  });
  return knex;
}
/* Exporting the function `databaseConnection` so that it can be used in other files. */
module.exports.databaseConnection = databaseConnection;
