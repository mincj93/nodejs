const oracledb = require('oracledb');
const fmd = require('formidable');

const odbCfg = require('../../odb/odbConfig.js');
const query = require('../../query/boardQuery.js');


const lg = console.log;



const boardCreate = {};

boardCreate.createQuery = (req) => {
    lg(req.body);

    /*
    // insert 쿼리에 넣어줄 value들을 <변수에 담아 배열로 넘겨야함>.
    params = [];    
    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        libDir: 'C:/instantclient-basic-windows.x64-21.10.0.0.0dbru/instantclient_21_10'
    });
    
    lg(query.selectList);

    // oracle DB와 연결
    oracledb.getConnection(
        odbCfg,
        function(err, connection) {
            if(err) {
                console.error(err.message);
                return;
            }
            // 너
            
    // insert into nodeboard values (nodeboard_seq.NEXTVAL , 'nodeboard title1', 'nodeboard content1', 'nodeboard writer1', to_char(sysdate, 'YYYYMMDDHH24MISS'));
            connection.execute(query.boardCreate, params, (err, result) => {
                if(err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log('success');

                res.send(result.rows);
                doRelease(connection, result.rows);
            }); // connection.execute
        }
    ); // oracledb.getConnection
*/
};



// connection 해제
function doRelease(connection, rowList) {
    connection.release((err) => {
        if(err) {
            console.error(err.message);
        }
    });
};



module.exports = boardCreate;