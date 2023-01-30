/* Importing the bcrypt library. */
const bcrypt = require("bcrypt");
/**
 * It takes a password, hashes it, and returns the hash
 * @param password - The password to hash.
 * @returns The hash of the password.
 */
async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 5);
  return hash;
}
/**
 * It takes a password and a hash, and returns true if the password matches the hash, and false if it
 * doesn't
 * @param password - The password that the user entered.
 * @param hash - The hashed password that was stored in the database.
 * @returns A boolean value.
 */
async function comparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}
/* Exporting the functions so that they can be used in other files. */
module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
