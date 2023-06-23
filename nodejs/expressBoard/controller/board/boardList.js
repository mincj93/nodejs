const oracledb = require('oracledb');
const odbCfg = require('../../odb/odbConfig.js');
const query = require('../../query/boardQuery.js');

const lg = console.log;

// connection 해제
function doRelease(connection) {
	connection.release((err) => {
		if(err) {
			console.error(err.message);
		}
		lg(`connection 해제`);
	});
}


const boardList = {};

boardList.selectListQuery = () => {

    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        libDir: 'C:/instantclient-basic-windows.x64-21.10.0.0.0dbru/instantclient_21_10'
    });
    
    lg(query.selectList);

    oracledb.getConnection(
	    odbCfg,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                return;
            }

            // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
            connection.execute(query.selectList, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
                if(err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                lg('조회 성공');

                // /api/customers 입력시 App.js에 데이터 전송
                lg(result.rows[0].BRD_IDX);
                doRelease(connection);
                const lists = result.rows;
                return lists;
            });
        }
    );// oracledb.getConnection
}

module.exports = boardList;