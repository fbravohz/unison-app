/* Importing the databaseService module. */
const databaseService = require("./../lib/databaseService");
/**
 * It takes a username as an argument, connects to the database, queries the database for the user, and
 * returns the user if it exists
 * @param username - The username of the user you want to get.
 * @returns The user object
 */
async function getUser(username) {
  /* Creating a connection to the database. */
  const db = databaseService.databaseConnection();
  /* Checking if the username is null, and if it is, it sets it to an empty string. */
  if (!username) username = "";
  /* Querying the database for the user with the email of the username. */
  const query = await db("users").select("*").where("email", username);
  /* It closes the connection to the database. */
  db.destroy();
  /* Checking if the query returned any results. If it did not, it returns null. */
  if (query.length === 0) {
    return null;
  }
  /* Returning the first element of the query array. */
  return query[0];
}
/* Exporting the function `getUser` so that it can be used in other files. */
module.exports.getUser = getUser;
