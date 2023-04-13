/* Importing the databaseService module. */
const databaseService = require("./../lib/databaseService");
const { UserModel } = require("./userModel");

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
      const userModel = new UserModel()
      const [result] = await userModel.userReadAll()
      Object.keys(result).forEach((column) => {
        result[column] = '';
      })
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.#knex.destroy();
    }
  }
}

module.exports = { ColumnsModel };
