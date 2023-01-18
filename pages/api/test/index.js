const createSqlPool = require('./../../../server/database/connect-db');

const getQuery = async () => {
  const db = await createSqlPool();
  const connection = await db.getConnection();
  const result = await connection.query("SELECT * FROM test;");
  await connection.release();
  return result;
  }

export default function handler(req, res) {
  getQuery().then((result) => {
    res.status(200).json({ db_rows: result});
  });
}