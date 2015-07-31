// contains Express application controllers
// in MVC pattern, controller uses model to retrieve the data portion and view template to render HTML

// CommonJS module pattern
// supports exporting of several functions
// middleware callback function when HTTP request occurs
exports.render = function(req, res) {
  // render index template an output as an HTML response
  res.render('index', {
      title: 'MEAN MVC',
      user: req.user ? req.user.username : ''
  });
};
