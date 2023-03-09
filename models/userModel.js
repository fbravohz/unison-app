/* Importing the databaseService module. */
const databaseService = require("./../lib/databaseService");
const hashService = require("./../lib/hashService");
/* Creating a class called UserModel. */
class UserModel {
  #knex;
/**
 * The constructor function is called when the class is instantiated
 */
  constructor() {
  }

/**
 * It takes a username, checks if the domain is valid, and returns the username if it is
 * @param username - The username of the user to be validated.
 * @returns A promise that resolves to a string.
 */
  async #validateUsername(username){
    this.#knex = databaseService.databaseConnection();
    const resultQuery = await this.#knex('company').select('domain');
    const resultMap = await resultQuery.map((value) => {
      const regex = new RegExp("@(" + value.domain + ")$");
      return regex.test(username);
    })
    if(resultMap.some(value => value === true)){
      return username.toLowerCase();
    }
    else{
      const err = new Error('Invalid username, must have a valid domain.');
      err.code = 'ERR_INVALID_USERNAME';
      throw err;
    }
  }
/**
 * It takes a password as a string, validates it, and returns a hashed version of it
 * @param password - The password to be validated.
 * @returns A promise that resolves to a hashed password.
 */
  async #validatePassword(password){
    if(typeof(password) == 'string' && password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z\d]).{8,}$/)){
      return await hashService.hashPassword(password);
      }
    else{
      const err = new Error('Invalid password.');
      err.code = 'ERR_INVALID_PASSWORD';
      throw err;
    }
  }
/**
 * It takes a string as an argument and returns the same string
 * @param fullname - The full name of the user.
 * @returns The fullname is being returned if it is a string.
 */
  #validateFullname(fullname){
    if(typeof(fullname) == 'string')
      return fullname;
    else{
      const err = new Error('Invalid fullname.');
      err.code = 'ERR_INVALID_FULLNAME';
      throw err;
    }
  }
/**
 * It takes a date string, converts it to a Date object, and returns the Date object if it's valid, or
 * throws an error if it's not
 * @param date - The date to validate.
 * @returns The date object is being returned.
 */
  #validateHireDate(date){
    const myDate = new Date(date);
    if(myDate instanceof Date && myDate != 'Invalid Date.')
      return myDate;
    else{
      const err = new Error('Invalid date');
      err.code = 'ERR_INVALID_DATE';
      throw err;
    }
  }
/**
 * It takes an id, checks if it's an integer, and if it is, returns it. If it's not, it throws an error
 * @param id - The id of the propertie to evaluate.
 * @returns The id if it is an integer, otherwise an error is thrown.
 */
  #validateIdIsInteger(id){
    if(Number.isInteger(id))
      return id;
    else{
      const err = new Error('Invalid id.');
      err.code = 'ERR_INVALID_ID';
      throw err;
    }
  }

/**
 * It validates the data and then inserts it into the database
 * @param userData - An object with the following properties:
  @param userData.username an abssa.com.mx email address.
  @param userData.fullname the user's full name.
  @param userData.password a secure password.
  @param userData.hireDate a string formatted with Date.toISOstring.
  @param userData.id_position an integer.
  @param userData.id_company an integer.
  @param userData.id_userProfile an integer.
  @param userData.id_userState an integer.
 * @returns the new id for the created user, or an error is thrown.
 */
  async userCreate(userData){
    this.#knex = databaseService.databaseConnection();
    try{
      userData.username = await this.#validateUsername(userData.username);
      userData.password = await this.#validatePassword(userData.password);
      userData.fullname = this.#validateFullname(userData.fullname);
      userData.hireDate = this.#validateHireDate(userData.hireDate);
      userData.id_position = this.#validateIdIsInteger(userData.id_position);
      userData.id_company =  this.#validateIdIsInteger(userData.id_company);
      userData.id_userProfile = this.#validateIdIsInteger(userData.id_userProfile);
      userData.id_userState = this.#validateIdIsInteger(userData.id_userState);
      return await this.#knex('user').insert(userData);
    } catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
/**
 * It returns the user with the given id
 * @param userId - The id of the user you want to read.
 * @returns The user object
 */
  async userReadById(id_user){
    this.#knex = databaseService.databaseConnection();
    try{
      const res = await this.#knex('user').select('*').where('id_user', id_user).andWhere('id_userState', '=', 1);
      if(res.length > 0){
        res.map((value) => {delete value.password});
        return res;
      }
      else{
      const err = new Error('User not found');
      err.code = 'ERR_USER_NOT_FOUND';
      throw err;
      }
    }catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
/**
 * > This function returns the user information of the user with the given username
 * @param username - The username of the user you want to read.
 * @returns The user object is being returned.
 */
  async #userReadByUsername(username){
    this.#knex = databaseService.databaseConnection();
    try{
      const query = await this.#knex("user").select("*").where("username", username);
      if (query.length > 0)
        return query;
      else{
        const err = new Error('The username does not exist');
        err.code = 'ERR_USERNAME_NOT_FOUND';
        throw err;
      }
    }catch(e){
      throw e;
    }finally{
      this.#knex.destroy();
    }
  }
/**
 * > This function returns all users in the database
 * @returns An array of objects containing all the users in the database.
 */
  async userReadAll(){
    this.#knex = databaseService.databaseConnection();
    try{
      const res = await this.#knex('user').select('*').where('id_userState','=', 1);
      if(res.length > 0){
        res.map((value) => {delete value.password});
        return res;
      }
      else{
      const err = new Error('No users found');
      err.code = 'ERR_NO_USERS_FOUND';
      throw err;
      }
    }catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
  /**
 * It returns the user with the given id
 * @param userId - The id of the user you want to read.
 * @returns The user object
 */
  async userReadByIdNotActive(id_user){
    this.#knex = databaseService.databaseConnection();
    try{
      const res = await this.#knex('user').select('*').where('id_user', id_user).andWhere('id_userState', '!=', 1);
      if(res.length > 0){
        res.map((value) => {delete value.password});
        return res;
      }
      else{
      const err = new Error('User not found');
      err.code = 'ERR_USER_NOT_FOUND';
      throw err;
      }
    }catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
  /**
 * > This function returns all users in the database
 * @returns An array of objects containing all the users in the database.
 */
  async userReadAllNotActive(){
    this.#knex = databaseService.databaseConnection();
    try{
      const res = await this.#knex('user').select('*').where('id_userState','!=', 1);
      if(res.length > 0){
        res.map((value) => {delete value.password});
        return res;
      }
      else{
      const err = new Error('No users found');
      err.code = 'ERR_NO_USERS_FOUND';
      throw err;
      }
    }catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
/**
 * It updates a user in the database
 * @param id_user - The id of the user you want to update.
 * @param userData - An object with the following properties:
 * @returns The number of rows affected by the update.
 */
  async userUpdateById(id_user, userData){
    this.#knex = databaseService.databaseConnection();
    try{
      if(userData.username != undefined)
        userData.username = await this.#validateUsername(userData.username);
      if(userData.password != undefined)
        userData.password = await this.#validatePassword(userData.password);
      if(userData.fullname != undefined)
        userData.fullname = this.#validateFullname(userData.fullname);
      if(userData.hireDate != undefined)
        userData.hireDate = this.#validateHireDate(userData.hireDate);
      if(userData.id_position != undefined)
        userData.id_position = this.#validateIdIsInteger(userData.id_position);
      if(userData.id_company != undefined)
        userData.id_company =  this.#validateIdIsInteger(userData.id_company);
      if(userData.id_userProfile != undefined)
        userData.id_userProfile = this.#validateIdIsInteger(userData.id_userProfile);
      if(userData.id_userState != undefined){
        userData.id_userState = this.#validateIdIsInteger(userData.id_userState);
        }
      return await this.#knex('user').where({id_user: id_user}).update(userData);
    }catch(e){
      throw e;
    } finally{
    this.#knex.destroy();
    }
  }
/**
 * This function is used to delete a user by changing the user's state to 3
 * @param id_user - The id of the user you want to delete.
 */
  async userDeleteByIdVirtual(id_user){
    const userDeleted = {
      id_userState: 3
    }
    try{
      await this.userUpdateById(id_user, userDeleted);
    } catch(e){
      throw e;
    }
  }
/**
 * It deletes a user from the database.
 * @param id_user - The id of the user to be deleted.
 * @returns The user is being deleted from the database.
 */
  async userDeleteByIdLogic(id_user){
    this.#knex = databaseService.databaseConnection();
    try{
      return await this.#knex.del('*').from('user').where('id_user',id_user);
    } catch(e){
      throw e;
    } finally {
      this.#knex.destroy();
    }
  }
  async userAuth(username, password){
    try{
      const [ userData ] = await this.#userReadByUsername(username);
      const res = await hashService.comparePassword(password, userData.password);
      if(res && userData.id_userState === 1){
        delete userData.password;
        return userData;
        }
      else{
        throw new Error();
      }
    }catch(e){
      e.message = 'Incorrect username and/or password';
      e.code = 'ERR_INCORRECT_CREDENTIALS';
      throw e;
    }
  }
}

module.exports = { UserModel };

// async getTableColumns(table){
//   let obj = {}
//   this.#knex = databaseService.databaseConnection();
//   const getTableData = await this.#knex.raw(`SELECT * FROM ${table}`);
//   for(const element of getTableData[1]){
//     obj = {[`column_${element.name}`]: element.name, ...obj}
//   }
//   this.#knex.destroy();
//   obj = Object.entries(obj).reverse();
//   obj = Object.fromEntries(obj)
//   return obj;
// }