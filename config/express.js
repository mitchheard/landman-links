// contains initialization code of our Express appl
// this is where we configure our Express app
// everything relsated to the Express configuration is added here

var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');

// CommonJS module pattern
// defines a module function that initializes the Express app
module.exports = function() {
  // create new instance of an Express app
  var app = express();

  // bodyParser provides several middlewares to handle request data
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // require routing file
  // calls routing file as a function passing app instance as an argument
  // routing file uses app instance to create new routing configuration
  // will then call the controller's render() method
  require('../app/routes/index.server.routes.js')(app);
  // users route definition
  require('../app/routes/users.server.routes.js')(app);

  // middleware
  app.use(express.static('./public'));

  // module function ends by returning the app instance
  return app;
};
