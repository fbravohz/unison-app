/* Importing the userModel and hashService modules. */
const userModel = require("./../models/userModel");
const hashService = require("./../lib/hashService");
/**
 * It takes a password, hashes it, and returns the hashed password
 * @param password - The password to be hashed.
 * @returns The hashed password
 */
async function createHashPassword(password) {
  hashedPass = await hashService.hashPassword(password);
  return hashedPass;
}
/**
 * It checks if the user exists in the database, if it does, it compares the password with the one in
 * the database, if it matches, it returns the user object
 * @param username - The username of the user you want to check.
 * @param password - The password that the user entered.
 */
async function checkUser(username, password) {
  /* Trying to execute the code inside the block. */
  try {
    /* Calling the getUser function in the userModel module, and it is waiting for the result. */
    const resultQuery = await userModel.getUser(username);
    /* Comparing the password that the user entered with the one in the database. */
    if (resultQuery) {
      /* Comparing the password that the user entered with the one in the database. */
      const resultComparePass = await hashService.comparePassword(
        password,
        resultQuery.password
      );
      /* Returning the user object if the password matches. */
      if (resultComparePass) {
        return resultQuery;
      }
    }
  } catch (err) {
    /* Catching any errors that might occur in the try block. */
    console.error(err);
  }
  /* Returning null if the user is not found in the database or if the password does not match. */
  return null;
}
/* Exporting the checkUser function so that it can be used in other modules. */
module.exports.checkUser = checkUser;
