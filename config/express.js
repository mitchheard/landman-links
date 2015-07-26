// contains initialization code of our Express appl
// this is where we configure our Express app
// everything relsated to the Express configuration is added here

// call the express module (node_modules/express)
var express = require('express');
// CommonJS module pattern
// defines a module function that initializes the Express app
module.exports = function() {
  // create new instance of an Express app
  var app = express();

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // require routing file
  // calls routing file as a function passing app instance as an argument
  // routing file uses app instance to create new routing configuration
  // will then call the controller's render() method
  require('../app/routes/index.server.routes.js')(app);

  // middleware
  app.use(express.static('./public'));

  // module function ends by returning the app instance
  return app;
};
