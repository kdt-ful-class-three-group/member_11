const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {
  console.log(req.url)
  if(req.method === 'GET') {
    if(req.url === '/') {
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
      res.write(fs.readFileSync('index.html'));
      res.end();
    }
    if(req.url === '/style.css') {
      res.writeHead(200, {'content-type': 'text/css; charset=utf-8'});
      res.write(fs.readFileSync('style.css'));
      res.end();
    }
  }
});

const PORT = 5500;
server.listen(PORT, function() {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});