/* Importing the UserController class from the controllers/userController.js file. */
const { ChoicesController } = require('../../../controllers/choicesController');

/**
 * It's a function that takes in a request and a response, and returns a response
 * @param req - The request object.
 * @param res - The response object.
 */
export default async function ListChoices(req, res){
    const choicesController = new ChoicesController();
    const result = await choicesController.choices(req);
    res.status(result.status).send(result);
}