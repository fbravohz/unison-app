/* Importing the UserController class from the controllers/userController.js file. */
const { UserController } = require('./../../../controllers/userController');

/**
 * It creates a new instance of the UserController class, calls the usersId method from the
 * userController class, and sends the result of the usersId method to the client
 * @param req - The request object.
 * @param res - The response object.
 */
export default async function usersId(req, res){
    const userController = new UserController();
    const result = await userController.usersId(req);
    res.status(result.status).send(result);
}