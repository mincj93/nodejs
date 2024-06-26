const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');


const app = express();
// app.use(express.static(__dirname + '/public')); // 정적폴더 사용하기위해 등록함.
app.use(express.static(path.join(__dirname, '../testreact/build')));
app.use(express.json());
app.use(cors());

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
    res.sendFile(path.join('/index.html'));
})

app.get('/shop', (req, res) => {
    res.send('shop 요청');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});


app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/list', async (req, res) => {
    lg(`node 리스트 조회 req == ${JSON.stringify(req.body)}`);
    let result = await db.collection('post').find().toArray()
    lg(result);
    res.send(result)
});


app.listen(8080, () => {
    lg('http://localhost:8080 에서 서버 실행중')
})