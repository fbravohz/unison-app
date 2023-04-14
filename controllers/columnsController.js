const { ColumnsModel } = require('./../models/columnsModel')
const { HttpCodes } = require('./../lib/httpCodesService');

class ColumnsController {
  constructor(){
  }
/**
 * It returns a list of columns of the specified table in the query parameters.
 * @param req - The request object.
 * @returns a response object.
 */
  async getTableColumns( req ){
    const httpCodes = new HttpCodes();
    const columnsModel = new ColumnsModel();

    if(!req.cookies?.growhillSession)
      return httpCodes.responseUnauthorized;

    if(req.method === 'GET'){
      try{
        let result;
        if(req.query.tableName === 'user')
          result = await columnsModel.getUserColumnsByTableName();
        else
          result = null;
        httpCodes.responseOk.data = result;
        return httpCodes.responseOk;
      }catch(e){
        httpCodes.responseNotFound.code = e.code;
        httpCodes.responseNotFound.message = e.message;
        return httpCodes.responseNotFound;
      }
    }
/* Returning a response object with the status code 405 (Method Not Allowed)
if the request method is not GET. */
    else{
      return httpCodes.responseMethodNotAllowed;
    }
  }
}

module.exports = { ColumnsController };