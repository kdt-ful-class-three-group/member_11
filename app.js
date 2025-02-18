const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
  if(req.method === 'GET') {
    if(req.url === '/') {
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(fs.readFileSync('./index.html'));
      res.end();
    }
  }
});

function start(port) {
  server.listen(port, function() {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
  });
}

start(3000);