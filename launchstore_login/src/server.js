const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const session = require('./config/session');

const server = express();

server.use(session); // Create user session;
server.use(express.urlencoded({ extended: true })); // Active request.body (json)
server.use(express.static('public')); // Pointer to public folder
server.use(methodOverride('_method')); // Active methods: PUT / DELETE
server.use(routes);

server.set('view engine', 'njk'); // Active njk extension

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, function () {
  console.log('server is running');
});
