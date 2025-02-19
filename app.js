const http = require('http');
const fs = require('fs');
const server = http.createServer(function(req, res) {
  console.log(req.url);
  if(req.method === 'GET') {
    if(req.url === '/') {
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
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
        console.log(data.toString());
        const dataString = data.toString();

        fs.writeFileSync('data.json', JSON.stringify(dataString), 'utf8', function(err) {
          if (err) {
            console.log(err) 
          }
        });

      });
      req.on('end', function(){

      })
    }
  }
});

function start(port) {
  server.listen(port, function() {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
  });
}
start(3000);