const oracledb = require('oracledb');
const path = require('path');

const odb = require('../../odb/odb.js');
const query = require('../../query/boardQuery.js');

const lg = console.log;



const boardList = {};

boardList.readList = (req, res) => {
    //lg(query.selectList);
    let url = path.join(__dirname,'../../public/board/boardList.ejs');
    lg('컨트롤러 url' , url);
    lg('컨트롤러 req, res' , req, res);
    odb.RConn(query.selectList, req, res, url);
};


module.exports = boardList;