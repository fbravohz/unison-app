/* Importing the UserModel and HttpCodes classes from the userModel.js and httpCodesService.js files. */
const { ChoicesModel } = require("./../models/choicesModel");
const { HttpCodes } = require('./../lib/httpCodesService');

/* It's a controller that handles requests to the /choices endpoint */
class ChoicesController {
  constructor(){
  }
/**
 * It returns a list of choices for a given table
 * @param req - The request object.
 * @returns a response object.
 */
  async choices( req ){
    const httpCodes = new HttpCodes();
    const choicesModel = new ChoicesModel();
/* Checking if the request has a cookie named growhillSession. If it doesn't, it returns a response
object with the status code 401 (Unauthorized). */
    if(!req.cookies?.growhillSession)
    return httpCodes.responseUnauthorized;
/* Checking if the request method is GET and if it is, it is calling the choicesRead function in the choicesModel.js file. */
    if(req.method === 'GET'){
      try{
        const result = await choicesModel.choicesRead(req.query.tableName);
        httpCodes.responseOk.data = result;
        return httpCodes.responseOk;
      }catch(e){
        httpCodes.responseNotFound.code = e.code;
        httpCodes.responseNotFound.message = e.message;
        return httpCodes.responseNotFound;
      }
    }
/* Returning a response object with the status code 405 (Method Not Allowed) if the request method is not GET. */
    else{
      return httpCodes.responseMethodNotAllowed;
    }
  }
}

module.exports = { ChoicesController };