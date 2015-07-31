// contains initialization code of our Express app
// this is where we configure our Express app
// everything relsated to the Express configuration is added here

var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session');

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

  // temporary messages in a session object
  app.use(flash());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'OurSuperSecretCookieSecret'
  }));

  // use this code before and route definitions
  app.use(passport.initialize());
  app.use(passport.session());

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
