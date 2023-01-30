/* Importing the userController, the ironSession middleware and the ironOptions. */
const userController = require("./../../../controllers/userController");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./../../../lib/ironOptions";
/* Exporting the loginRoute function with the iron session middleware. */
export default withIronSessionApiRoute(loginRoute, ironOptions);
/**
 * It checks if the request method is POST, if it is, it checks if the username and password are valid,
 * if they are, it saves the user to the session and returns the session, otherwise it returns an error
 * @param req - The request object.
 * @param res - The response object.
 */
async function loginRoute(req, res) {
  /* Checking if the request method is POST, if it is, it checks if the username and password are valid,
  if they are, it saves the user to the session and returns the session, otherwise it returns an
  error */
  if (req.method === "POST") {
    /* Destructuring the username and password from the request body. */
    const { username, password } = req.body;
    /* Checking if the user is valid, if it is, it deletes the password from the user object, saves the
    user to the session and returns the session. */
    const isUser = await userController.checkUser(username, password);
    if (isUser !== null) {
      delete isUser.password;
      req.session.user = isUser;
      /* It saves the session to the database. */
      await req.session.save();
      res.status(200).json(req.session);
    } else {
    /* Returning an error if the credentials are not valid. */
      res.status(errorInvalidCredentials.status).json(errorInvalidCredentials);
    }
  } else {
  /* Returning an error if the request method is not POST. */
    res.status(errorInvalidRequest.status).json(errorInvalidRequest);
  }
}
/* An error object that is returned if the request method is not POST. */
const errorInvalidRequest = {
  object: "error",
  status: 400,
  code: "invalid_request_method",
  message: "Invalid request method.",
};
/* An error object that is returned if the credentials are not valid. */
const errorInvalidCredentials = {
  object: "error",
  status: 403,
  code: "invalid_credentials",
  message: "Invalid credentials.",
};
