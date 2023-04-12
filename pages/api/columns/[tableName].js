/* This line of code is importing the `ColumnsController` class from the `columnsController.js`*/
const { ColumnsController } = require('/controllers/columnsController');

/**
 * It's a function that takes in a request and a response, and returns a response
 * with the results of getting columns of a specific table.
 * @param req - The request object.
 * @param res - The response object.
 */
export default async function ListColumns(req, res){
    const columnsController = new ColumnsController();
    const result = await columnsController.getTableColumns(req);
    res.status(result.status).send(result);
}