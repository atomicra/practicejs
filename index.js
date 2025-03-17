const express = require('express');
const helper = require('./utils/helper');

const path = require('path');

const port = 3000;
const app = module.exports = express();
app
  .use(express.static(path.join(__dirname, './public')))
  .use(express.static(path.join(__dirname, './node_modules')));
const server = app.listen(port, () => {
  const extip = helper.getExtIP();
  console.log(`Express started on http://${extip.length > 0 ? extip : 'localhost'}:${port}/`);
});
helper.config(server);