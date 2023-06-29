const path = require('path');

const express = require('express');
const router = express.Router();
const ejs = require('ejs');

const readFileCtr = require('../controller/readfile.js');

const bPath = path.join(__dirname , "../public/board");
const brdCtrPath = path.join(__dirname,'../controller/board');
// app.get('/board/main', function(req,res) {
//     res.render(__dirname + "/public/board/boardMain.ejs")
// });

// board controller 폴더 경로 C:\Users\mincj\OneDrive\바탕 화면\myFolder\nodejs\nodejs\expressBoard\controller\board


const lg = console.log;

router.get('/', (req, res) => {
    res.render(bPath + "/boardMain.ejs");
});


router.get('/readFile', (req, res) => {
    lg('get', '/board/readFile');
    readFileCtr.readFile();
    //res.send();
});

router.get('/list', (req, res) => {
    lg('get', '/board/list');
    const boardList = require(brdCtrPath + '/boardList.js');
    boardList.readList(req, res);
    // res.render(bPath + "/boardList.ejs",{val1 :"val1String"});
    //res.send();
});

router.get('/write', (req, res) => {
    lg('get', '/board/write');
    res.render(bPath + "/boardWrite.ejs");
    //res.send();
});

router.post('/write', (req, res) => {
    const boardCreate = require(brdCtrPath + '/boardCreate.js');
    lg('post', '/board/write');
    boardCreate.createQuery(req);
    res.render(bPath + "/boardWrite.ejs");
});

module.exports = router;