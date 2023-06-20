const path = require('path');
const oracledb = require("oracledb");
const dbConfig = require("../config/dbConfig");

const express = require('express');
const router = express.Router();

const readFileCtr = require('../controller/readfile.js');
const readCtr = require("../controller/board/boardReadList.js");

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
    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        libDir: 'C:/instantclient-basic-windows.x64-21.10.0.0.0dbru/instantclient_21_10'
    });
    oracledb.getConnection(
	    dbConfig,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                lg(dbConfig);
                return;
            }

            let query = 'select * from nodeboard';

            // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
            connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
                if(err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                lg('조회 성공');

                // /api/customers 입력시 App.js에 데이터 전송
                lg(result.rows);
                doRelease(connection);
                const lists = result.rows;
                return lists;
            });
        }
    )// oracledb.getConnection
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


// connection 해제
function doRelease(connection) {
	connection.release((err) => {
		if(err) {
			console.error(err.message);
		}
		lg(`connection 해제`);
	});
}

module.exports = router;