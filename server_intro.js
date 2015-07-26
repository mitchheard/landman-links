var http = require('http');
var port = 1337;

http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  res.end("Hello there, simple web server.");
}).listen(port);

console.log('Our web server runs at http://localhost:' + port);
