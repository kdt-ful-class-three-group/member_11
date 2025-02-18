const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer(function(req, res) {
  console.log(req.url);
  if(req.method === 'GET') {
    if(req.url === '/') {
      res.writeHead(200, {'content-type': 'text/html'});
      res.write(fs.readFileSync('./index.html'));
      res.end();
    }
    else {
      res.writeHead(404, {'content-type': 'text/html'});
      res.write('<h1>404 Not Found</h1>');
      res.end();
    }
  }
  if(req.method === 'POST') {
    if(req.url === '/data') {

      req.on('data', function(data) {
        // on = addEventListener 같은것.
        console.log(qs.stringify(data));
        // func.getData(data);
        fs.writeFileSync('data.txt', data.toString());
      });
      req.on('end', function(){
        // on('end', ) = 이벤트를 끝낸다는 뜻.
        console.log("응답 잘 받음");
        const data = fs.readFileSync('data.txt').toString();

        console.log(data);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(`<h1>${data.split('=')[1]}</h1>`);
        res.end();
      });
    }
  }
});

function start(port) {
  server.listen(port, function() {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
  });
}

start(3000);