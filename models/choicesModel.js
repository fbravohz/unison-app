/* Importing the databaseService module. */
const databaseService = require('./../lib/databaseService');
/* It's a class that has a method that returns a list of choices for a given table */
class ChoicesModel {
  #knex;
  constructor(){
  }
/**
 * It returns a list of all the choices for a given table
 * @param tableName - the name of the table you want to read from
 * @returns An array of objects with the id and the name of the table.
 */
  async choicesRead( tableName ){
    let idName = `id_${tableName}`
    try{
      this.#knex = databaseService.databaseConnection();
      return await this.#knex.select(idName, tableName).from(tableName);
    } catch (e) {
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
}
/* It's exporting the class ChoicesModel so that it can be used in other files. */
module.exports = { ChoicesModel };


      // const result = await Promise.all(Object.keys(fk).map(async (value) => {
      //   return await this.#knex.select(fk[value]).from(value);
      // }));
      // return result;