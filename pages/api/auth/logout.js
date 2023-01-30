/* Importing the iron-session package and the ironOptions file. */
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";
/* Exporting the logoutRoute function with the ironOptions. */
export default withIronSessionApiRoute(logoutRoute, ironOptions);
/**
 * If the user is logged in, destroy the session and send a 200 status code. If the user is not logged
 * in, send a 400 status code.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
async function logoutRoute(req, res) {
  /* This is checking if the user is logged in. If the user is logged in, the session is destroyed and
  a 200 status code is sent. */
  if (req.session.user !== undefined) {
    /* Destroying the session. */
    req.session.destroy();
    /* Sending a 200 status code to the client. */
    res.status(200).end();
  } else {
    /* If the user is not logged in, a 400 status code is sent. */
    res.status(400).end();
  }
}
