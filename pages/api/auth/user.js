/* It's importing the `withIronSessionApiRoute` function from the `iron-session/next` package,
the `ironOptions` object from the `lib/ironOptions` file, and the `AuthController` class from the
`controllers/authController` file. */
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";
const { AuthController } = require('./../../../controllers/authController');
/* Exporting the `userRoute` function with the `withIronSessionApiRoute` function. */
export default withIronSessionApiRoute(userRoute, ironOptions);
/**
 * It's an async function that takes in a request and response object, creates a new instance of the
 * AuthController class, and then calls the epAuthUser method on that instance, passing in the request
 * object
 * @param req - The request object.
 * @param res - The response object.
 */
async function userRoute(req, res) {
  const authController = new AuthController();
  const result = await authController.epAuthUser(req);
  res.status(result.status).send(result);
}
