/* Importing the databaseService module. */
const databaseService = require("./../lib/databaseService");

class ColumnsModel {
  #knex;
/**
 * The constructor function is called when the class is instantiated
 */
  constructor() {
  }

/**
 * This is an async function that retrieves column names from a specified table using a SQL query and
 * returns them as an array.
 * @param column - The parameter `column` is a string representing the name of a database table for
 * which we want to retrieve the column names.
 * @returns This function returns an array of column names for a given table name.
 */
  async getColumnsByTableName(table){
    this.#knex = databaseService.databaseConnection();
      try {
      const [result] = await this.#knex.raw(`SHOW COLUMNS FROM ${table}`)
      const columns = result.map((value) => {
        return value.Field
      })
      return columns
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.#knex.destroy();
    }
  }
}

module.exports = { ColumnsModel };
