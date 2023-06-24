const path = require('path');

const express = require('express');
const router = express.Router();

const readFileCtr = require('../controller/readfile.js');

const bPath = path.join(__dirname , "../public/board");
const brdCtrPath = path.join(__dirname,'../controller/board');
// app.get('/board/main', function(req,res) {
//     res.sendFile(__dirname + "/public/board/boardMain.html")
// });

// board controller 폴더 경로 C:\Users\mincj\OneDrive\바탕 화면\myFolder\nodejs\nodejs\expressBoard\controller\board


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
    const boardList = require(brdCtrPath + '/boardList.js');
    boardList.readList();
    res.sendFile(bPath + "/boardList.html");
    //res.send();
});

router.get('/write', (req, res) => {
    lg('get', '/board/write');
    res.sendFile(bPath + "/boardWrite.html");
    //res.send();
});

router.post('/write', (req, res) => {
    const boardCreate = require(brdCtrPath + '/boardCreate.js');
    lg('post', '/board/write');
    boardCreate.createQuery(req);
    res.sendFile(bPath + "/boardWrite.html");
});

module.exports = router;