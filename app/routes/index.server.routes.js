// contains Express application routing middleware
// Express routing functionality to make use of controller

// CommonJS module pattern supports the use of single module function
// passing Express app ("app") from express.js
module.exports = function(app) {
  var index = require('../controllers/index.server.controller');
  // tells Express to execute the middleware function for any HTTP request
  // that comes through a GET method and is directed to the root path ('/')
  // call render function in controller
  app.get('/', index.render);
};
