var port = 1337;
var connect = require('connect');
var app = connect();
var logger = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};

// middleware function
var howdyWorld = function(req, res, next) {
  res.setHeader('Connect-Type', 'text/plain');
  res.end('Howdy World');
};

app.use(logger);
app.use('/howdy', howdyWorld);

app.listen(port);
console.log('Server running at http://localhost:' + port);
