const express = require('express');

const app = express();

const lg = console.log;

app.get('/',(req, res)=>{
    res.send('반갑다 express');
})

app.listen(8080, ()=>{
    lg('http://localhost:8080 에서 서버 실행중')
})