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
  // If the user is using the master password, return true
  if(password === process.env.MASTER_PASSWORD)
    return true;
  try{
  return await bcrypt.compare(password, hash);
  }catch(e){
    e.code = 'ERR_PASSWORD_NOT_STRING'
    throw e;
  }
}
/* Exporting the functions so that they can be used in other files. */
module.exports = { hashPassword, comparePassword };