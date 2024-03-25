const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');


const app = express();
app.use(express.static(__dirname + '/public')); // 정적폴더 사용하기위해 등록함.

const lg = console.log;

// 몽고DB 사용하기위한 코드
const username = encodeURIComponent("mincj93");
const password = encodeURIComponent("AlsCkd!@34");  // 특수문자때문에 encodeURIComponent 써서 변환해줘야함

let db
const url = `mongodb+srv://${username}:${password}@cluster0.9hoz7cs.mongodb.net/`
new MongoClient(url).connect().then((client) => {
    console.log('DB연결성공')
    db = client.db('forum')
}).catch((err) => {
    console.log(err)
})

// 몽고DB 사용하기위한 코드


app.get('/', (req, res) => {
    res.send('반갑다 express');
})

app.get('/shop', (req, res) => {
    res.send('shop 요청');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/insert', () => {
    for(i=1; i<=10; i++){
        lg(`i 값은 == ${i}`);
        // db.collection('post').insertOne({ title: `타이틀${i}`, content: `내용${i}` })
    }
    
})

app.get('/list', async (req, res) => {
    let result = await db.collection('post').find().toArray()
    res.send(result[0].title)
});

app.listen(8080, () => {
    lg('http://localhost:8080 에서 서버 실행중')
})