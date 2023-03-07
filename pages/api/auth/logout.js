/* Importing the iron-session package and the ironOptions file. */
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";
const { HttpCodes } = require('./../../../lib/httpCodesService');
const { AuthController } = require('./../../../controllers/authController');
/* Exporting the logoutRoute function with the ironOptions. */
export default withIronSessionApiRoute(logoutRoute, ironOptions);

/**
 * The function is called logoutRoute and it's an async function. It takes two parameters, req and res.
 * It creates a new instance of the AuthController class and calls the epAuthLogout method on that
 * instance, passing in the req parameter. It then sends the result of the epAuthLogout method to the
 * client
 * @param req - The request object.
 * @param res - The response object.
 */
async function logoutRoute(req, res) {
  const authController = new AuthController();
  const result = await authController.epAuthLogout(req);
  res.status(result.status).send(result);
}
