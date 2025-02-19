const http = require('http');
const fs = require('fs');
const createHtml = require('./createHtml');
const qs = require('querystring');

const server = http.createServer(function(req, res) {
  console.log(req.url)
  if(req.method === 'GET') {
    // 요청하는 메소드가 get이면
    if(req.url === '/') {
      // 요청하는 url이 /이면
      res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
      // 서버코드 200(성공), {콘텐츠타입은 html/언어는 한국어}
      res.write(fs.readFileSync('index.html'));
      // index.html을 불러와서, 응답한다.
      res.end();
      // 응답 끝.
    }
    if(req.url === '/style.css') {
      res.writeHead(200, {'content-type': 'text/css; charset=utf-8'});
      res.write(fs.readFileSync('style.css'));
      res.end();
    }
    if(req.url === '/add') {
      // 요청하는 url이 /add 면
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
      // createHtml모듈을 써서, body에 들어갈 내용, input3개, 버튼 하나를 만든다.
      res.end();
      // 응답 끝
    }
    if(req.url.endsWith('.js')) {
      // 만약 요청하는 url의 끝이 .js로 끝나면
      res.writeHead(200, {'content-type': 'text/javascript; charset=utf-8'});
      res.write(fs.readFileSync(`.${req.url}`));
      // 요청한 url의 해당 파일을 가져온다.
      res.end();
      // 응답 끝.
    }
  }
  if(req.method === 'POST') {
    // 요청하는 메서드가 post면
    if(req.url === '/data') {
      // 요청하는 url이 /data면
      req.on('data', function(data) {
        // 기능을 하나 넣을거야.
        console.log(data.toString());
        // 데이터를 문자열로 확인.
        const dataString = data.toString();
        // 데이터를 문자열로 가져오기.
        const parseData = qs.parse(dataString);
        // 문자열로 가져온 데이터를 쿼리스트링으로 해석, 객체로 가져온다.
        console.log(parseData);
        // 객체로 가져온 데이터 확인.

        const arr = [];
        // 빈 배열 생성
        arr.push(parseData);
        // 빈 배열에 post로 가져온 객체 데이터를 집어넣는다.

        if(fs.existsSync('data.json')) {
          // 만약 data.json이라는 파일이 존재한다면
          const jsonData = JSON.parse(fs.readFileSync('data.json'));
          // jsonData에 data.json파일을 해석해서 객체로 만들고,
          console.log(jsonData);
          // jsonData 확인
          jsonData.push(parseData);
          // jsonData배열에 parseData객체를 넣는다.
          fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2), 'utf-8');
          // jsonData를 json파일로 변경.
          // 모양은 원래 json내용 + 추가된 내용 을 덮어씌우는 형태
          

        } else {
          // 존재하지 않는다면
          fs.writeFileSync('data.json', JSON.stringify(arr, null, 2), 'utf-8');
          // 위에서 객체로 만들어놓은 데이터를 json파일로 만들어준다.
        }

        
      });
      req.on('end', function() {
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
        // 서버코드 200(성공), {콘텐츠타입은 html/언어는 한국어}
        res.write(fs.readFileSync('index.html'));
        // index.html을 불러와서, 응답한다.
        res.end();
        // 응답 끝.
      });
    }
  }
});

const PORT = 5500;
server.listen(PORT, function() {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중입니다.`);
});