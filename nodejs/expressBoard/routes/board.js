const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();
const lg = console.log;
const readFileCtr = require('../controller/readfile.js');
const util = require('../config/dbConfig.js');
const bPath = path.join(__dirname , "../public/board");
// app.get('/board/main', function(req,res) {
//     res.sendFile(__dirname + "/public/board/boardMain.html")
// });

router.get('/', (req, res) => {
    res.sendFile(bPath + "/boardMain.html");
});


router.get('/readFile', (req, res) => {
    lg('get방식', 'readFile');
    readFileCtr.readFile();
    //res.send();
});

router.post('/readFile', (req, res) => {
    lg('post방식', 'readFile');
    readFileCtr.readFile();
    //res.send();
});

module.exports = router;