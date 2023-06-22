const path = require('path');
const odbCtr = require("../config/dbConfig");

const express = require('express');
const router = express.Router();

const readFileCtr = require('../controller/readfile.js');

const bPath = path.join(__dirname , "../public/board");
// app.get('/board/main', function(req,res) {
//     res.sendFile(__dirname + "/public/board/boardMain.html")
// });


const lg = console.log;

router.get('/', (req, res) => {
    res.sendFile(bPath + "/boardMain.html");
});


router.get('/readFile', (req, res) => {
    lg('get', '/board/readFile');
    readFileCtr.readFile();
    //res.send();
});

router.get('/list', (req, res) => {
    lg('get', '/board/list');
    odbCtr.runQuery("select * from nodeboard");
    res.sendFile(bPath + "/boardList.html");
    //res.send();
});

router.get('/write', (req, res) => {
    lg('get', '/board/write');
    res.sendFile(bPath + "/boardWrite.html");
    //res.send();
});

router.post('/write', (req, res) => {
    lg('post', '/board/write');
    boardCtr.writeBoard(req);
    res.sendFile(bPath + "/boardWrite.html");
});

module.exports = router;