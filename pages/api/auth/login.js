/* Importing the iron-session middleware, the ironOptions, and the AuthController class. */
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";
const { AuthController } = require('./../../../controllers/authController');
/* Exporting the loginRoute function with the iron session middleware. */
export default withIronSessionApiRoute(loginRoute, ironOptions);
/**
 * It creates a new instance of the AuthController class, calls the epAuthLogin method on that
 * instance, and then sends the result of that method to the client
 * @param req - The request object.
 * @param res - The response object.
 */
async function loginRoute(req, res) {
  const authController = new AuthController();
  const result = await authController.epAuthLogin(req);
  res.status(result.status).send(result);
}

