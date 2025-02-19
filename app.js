const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req, res) {

});


const PORT = 3000;
server.listen(PORT, function() {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});