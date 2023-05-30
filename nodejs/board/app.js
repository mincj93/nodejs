const express = require('express');
const path = require('path');   // 경로처리

const app = express();

// ejs 엔진을 실행하기 위한 코드
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
//app.engine('html', require('ejs').renderFile); 
// html 파일 만들면 ejs 로 바꾸는 역할인듯?

//app.use(express.static('public'));
const lg = console.log;

lg(__dirname);

app.get('/', (req,res) =>{
    res.render('index');
    // 기본적으로 ejs 파일 찾는 경로로 인해 /views/index.ejs 경로를 타게 됨
});


app.listen(3000, () =>{
    lg('서버실행 3000 포트');
})