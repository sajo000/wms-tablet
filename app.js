const express = require('express');
const app = express();

// public 폴더를 정적 파일 경로로 지정
app.use(express.static('front'));

app.listen(3000, '0.0.0.0', () => {
  console.log('서버 실행 중!');
});
