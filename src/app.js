var http = require('http');

http.createServer(function(req, res) {
    const [when, who, what] = [new Date().toISOString(), req.connection.remoteAddress, req.url];
    console.log(`[${ when }] - client: [${ who }] - path: [${ what }]`);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write("Not Found");
    res.end();
}).listen(8888);
