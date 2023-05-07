const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');   // 경로처리

const app = express();

app.set('port', process.env.PORT || 3000);
// 전역변수 port 만듬. process.env.PORT 에 값이 없을 경우 3000으로 설정해준다.

/*
app.get('/', (req,res) =>{
    res.send('hello express 1213');
});
*/

app.use(cookieParser());

//html 파일 연결하기
app.get('/', (req,res,next) =>{
    req.myVal = '1회성값';
    //res.sendFile(path.join(__dirname, 'index.html'));
    next('route');
});

app.get('/', (req,res) =>{
    console.log('tsetset '+req.myVal);
    res.sendFile(path.join(__dirname, 'index.html'));
});

//쿠키 만들기. res.cookie(키,값, {옵션키:옵션값});
app.get('/setCookie', (req,res) =>{
    
    let cookieName = 'mycookie';
    let expireDate = new Date( Date.now() + 60 * 60 * 1000 * 24 * 7);   //1주일
    res.cookie('cookieName', encodeURIComponent(cookieName), {
        expires: expireDate,    // 만료일
        httpOnly: true,         // 자바스크립트 공격 방어용
        path: '/',              // 쿠키 유효 주소 범위
    });
    console.log(req.cookies);
    res.sendFile(path.join(__dirname, 'index.html'));
});

//쿠키 삭제 res.clearCookie(키,{옵션키:옵션값});
// 아래의 경우 cookieName 이 키 인데, cookieKey객체에 key값이 cookieName 인 쿠키가 없으면 삭제 안함.
app.get('/delCookie', (req,res) =>{
    let cookieKey = req.cookies;
    res.clearCookie('cookieName', encodeURIComponent(cookieKey), {
        httpOnly: true,         // 자바스크립트 공격 방어용
        path: '/',              // 쿠키 유효 주소 범위
    });
    if(req.cookies){
        console.log(req.cookies);
    }else{
        console.log('쿠키없음');
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () =>{
    console.log('서버실행 3000 포트');
})