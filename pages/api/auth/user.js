/* Importing the `withIronSessionApiRoute` function from the `iron-session/next` package. */
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";

/* Exporting the `userRoute` function with the `withIronSessionApiRoute` function. */
export default withIronSessionApiRoute(userRoute, ironOptions);
/**
 * If the user is logged in, send the user object to the client. Otherwise, send an error message
 * @param req - The request object.
 * @param res - The response object.
 */
function userRoute(req, res) {
  /* Checking if the user is logged in. If the user is logged in, it sends the user object to the client. */
  if (req.session.user !== undefined) {
    res.status(200).send(req.session.user);
  } else {
  /* If the user is not logged in, it sends an error message to the client. */
    res.status(errorInvalidCredentials.status).send(errorInvalidCredentials);
  }
}
/* An error object that is returned if the credentials are not valid. */
const errorInvalidCredentials = {
  object: "error",
  status: 403,
  code: "invalid_credentials",
  message: "Invalid credentials.",
};
