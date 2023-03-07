/* Importing the userModel and hashService modules. */
const { UserModel } = require("./../models/userModel");
const { HttpCodes } = require('./../lib/httpCodesService');
class UserController {
  constructor(){
  }
/**
 * It handles the requests to the /users endpoint
 * @param req - The request object.
 * @returns an object with the following properties:
 *   - statusCode: The HTTP status code
 *   - message: The message to be displayed
 *   - data: The data to be displayed
 *   - code: The error code
 */
  async users( req ){
    const httpCodes = new HttpCodes();
    const userModel = new UserModel();
/* It checks if the cookie `growhillSession` is set. If it is not set, it returns a response object
with the HTTP status code 401 (Unauthorized). */
    if(!req.cookies?.growhillSession)
      return httpCodes.responseUnauthorized;
/* Handling the GET requests to the endpoint `/users`. */
    if(req.method === 'GET'){
      try{
        httpCodes.responseOk.data = await userModel.userReadAll();
        return httpCodes.responseOk;
      }catch(e){
        httpCodes.responseNotFound.message = e.message;
        httpCodes.responseNotFound.code = e.code;
        return httpCodes.responseNotFound;
      }
    }
/* Handling the POST requests to the endpoint `/users`. */
    if(req.method === 'POST'){
      try{
        const result = await userModel.userCreate(req.body);
        httpCodes.responseCreated.data = '/users/'+result;
        return httpCodes.responseCreated;
      }catch(e){
        httpCodes.responseBadRequest.code = e.code;
        httpCodes.responseBadRequest.message = e.message
        return httpCodes.responseBadRequest;
      }
    }
/* Returning a response object with the HTTP status code 405 (Method Not Allowed). */
    else{
      return httpCodes.responseMethodNotAllowed;
    }
  }
/**
 * It handles the requests to the endpoint `/users/:id` and returns the appropriate response
 * @param req - The request object.
 * @returns an object with the following properties:
 * - code: The HTTP status code
 * - message: The HTTP status message
 * - data: The data to be sent to the client
 */
  async usersId( req ){
    const httpCodes = new HttpCodes();
    const userModel = new UserModel();
/* It checks if the cookie `growhillSession` is set. If it is not set, it returns a response object
with the HTTP status code 401 (Unauthorized). */
    if(!req.cookies?.growhillSession)
      return httpCodes.responseUnauthorized;
/* A GET request to the endpoint `/users/:id` */
    if(req.method === 'GET'){
      try{
        const [ result ] = await userModel.userReadById(req.query.id);
        httpCodes.responseOk.data = result;
        return httpCodes.responseOk;
      }catch(e){
        httpCodes.responseNotFound.code = e.code;
        httpCodes.responseNotFound.message = e.message;
        return httpCodes.responseNotFound;
      }
    }
/* Handling the PATCH requests to the endpoint `/users/:id`. */
    if(req.method === 'PATCH'){
      try{
        if(await userModel.userUpdateById(req.query.id, req.body) === 0)
          return httpCodes.responseNotFound;
        httpCodes.responseOk.data = '/users/'+req.query.id;
        return httpCodes.responseOk;
      }catch(e){
        httpCodes.responseBadRequest.code = e.code;
        httpCodes.responseBadRequest.message = e.message;
        return httpCodes.responseBadRequest;
      }
    }
/* Handling the DELETE requests to the endpoint `/users/:id`. */
    if(req.method === 'DELETE'){
      try{
        const result = await userModel.userDeleteByIdVirtual(req.query.id);
        console.log(result);
        return httpCodes.responseNoContent;
      }catch(e){
        httpCodes.responseBadRequest.code = e.code;
        httpCodes.responseBadRequest.message = e.message;
        return httpCodes.responseBadRequest;
      }
    }
/* Returning a response object with the HTTP status code 405 (Method Not Allowed) */
    else{
      return httpCodes.responseMethodNotAllowed;
    }
  }
}

module.exports = { UserController };
