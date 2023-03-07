/* Importing the userModel and hashService modules. */
const { UserModel } = require("./../models/userModel");
const { HttpCodes } = require('./../lib/httpCodesService');

class AuthController {

  constructor(){
  }

/**
 * It takes a request object, checks if the request method is POST, if it is, it takes the username and
 * password from the request body, and then it calls the userAuth function from the userModel class,
 * which returns a user object if the username and password are correct, or throws an error if they are
 * not
 * @param req - The request object
 * @returns The response object is being returned.
 */
  async epAuthLogin( req ){
    const httpCodes = new HttpCodes();
    const userModel = new UserModel();
    if (req.method !== 'POST')
      return httpCodes.responseMethodNotAllowed;
    try{
      const {username, password} = req.body;
      httpCodes.responseOk.data = await userModel.userAuth(username, password);
      req.session.user = httpCodes.responseOk.data;
      await req.session.save();
      return httpCodes.responseOk;
    }catch(e){
      httpCodes.responseBadRequest.code = e.code;
      httpCodes.responseBadRequest.message = e.message;
      return httpCodes.responseBadRequest;
    }
  }
/**
 * If the user is logged in, return the user object. Otherwise, return a forbidden response
 * @param req - The request object
 * @returns The user object is being returned.
 */
  async epAuthUser( req ){
    const httpCodes = new HttpCodes();
    if (req.session.user !== undefined) {
      httpCodes.responseOk.data = req.session.user;
      return httpCodes.responseOk;
    }
    return httpCodes.responseForbidden;
  }
/**
 * > This function destroys the session if the user is logged in
 * @param req - The request object
 * @returns The responseNoContent is being returned.
 */
  async epAuthLogout( req ){
    const httpCodes = new HttpCodes();
    if (req.session.user !== undefined) {
      req.session.destroy();
      return httpCodes.responseNoContent;
    }
    return httpCodes.responseForbidden;
  }

}

module.exports = { AuthController };