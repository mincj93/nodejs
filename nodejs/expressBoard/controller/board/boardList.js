const oracledb = require('oracledb');

const odb = require('../../odb/odb.js');
const query = require('../../query/boardQuery.js');

const lg = console.log;



const boardList = {};

boardList.readList = (req) => {
    lg(query.selectList);
    odb.RConn(query.selectList, req);
};


module.exports = boardList;