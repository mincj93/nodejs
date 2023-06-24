const oracledb = require('oracledb');

const odb = require('../../odb/odb.js');
const query = require('../../query/boardQuery.js');

const lg = console.log;



const boardList = {};

boardList.readList = () => {
    lg(query.selectList);
    odb.getConn(query.selectList);
};


module.exports = boardList;