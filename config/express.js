// this is where we configure our Express app
// everything related to the Express configuration is added here

var express = require('express');
// initialize the Express app
module.exports = function() {
  // create new instance of an Express app
  var app = express();
  // require routing file, call as a function passing app instance as an argument
  // routing file uses app instance to create new routing configuration
  // will then call the controller's render() method
  // module function ends by returning the app instance
  require('../app/routes/index.server.routes.js')(app);
  return app;
};
