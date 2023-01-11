const { request } = require("express");
const express = require("express");
const next = require("next");
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use('/api', (req, res) => {
      if (req.url === '/users') {
        const user = {some: 'username'};
        res.json(user);
      } else {
        res.status(404).send("NOT_FOUND");
      }
    });

    server.all('*', (req, res) => {
      handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('>Custom server ready on http://localhost:3000');
    });
});
