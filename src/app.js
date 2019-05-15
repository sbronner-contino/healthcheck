var http = require('http');
var Services = require('./Services');

http.createServer(function(req, res) {
    var services = new Services();
    services.requestHandler(req, res);
}).listen(8888);
