/* Importing the UserController class from the userController.js file. */
const { UserController } = require('./../../../controllers/userController');
/**
 * It creates a new instance of the UserController class, calls the users function in the
 * userController, and sends the result of the function to the client
 * @param req - The request object.
 * @param res - The response object.
 */
export default async function users(req, res){
    const userController = new UserController();
    const result = await userController.users(req);
    res.status(result.status).send(result);
}
