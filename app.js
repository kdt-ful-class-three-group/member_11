const http = require('http');
const fs = require('fs');
const createHtml = require('./createHtml');
const qs = require('querystring');

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
    if(req.url === '/add') {
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
      res.write(createHtml(
        `
        <form action="/data" method="post">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="age" placeholder="age">
        <input type="text" name="hobby" placeholder="hobby">
        <button type="submit">추가</button>
        </form>
        `
      ));
      res.end();
    }
    if(req.url.endsWith('.js')) {
      res.writeHead(200, {'content-type': 'text/javascript; charset=utf-8'});
      res.write(fs.readFileSync(`.${req.url}`));
      res.end();
    }
  }
  if(req.method === 'POST') {
    if(req.url === '/data') {
      req.on('data', function(data) {
        console.log(data.toString());
        const dataString = data.toString();
        const parseData = qs.parse(dataString);
        console.log(parseData);
      });
      req.on('end', function() {
      });
    }
  }
});

const PORT = 5500;
server.listen(PORT, function() {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});