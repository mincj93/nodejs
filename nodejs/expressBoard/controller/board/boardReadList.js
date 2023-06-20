//Oracle 사용하기
//npm install oracledb --save
const oracledb = require("oracledb");
const dbConfig = require("../../config/dbConfig");

oracledb.autoCommit = true; //자동 커밋



const lg = console.log;
const ctr = {};

// oracle DB와 연결
ctr.readList = (req) => {

    oracledb.initOracleClient({
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
                res.send(result.rows);
                doRelease(connection);
                const res = result.rows;
                return res;
            });
        }
    )// oracledb.getConnection
};	




// connection 해제
function doRelease(connection) {
	connection.release((err) => {
		if(err) {
			console.error(err.message);
		}
		lg(`connection 해제`);
	});
}

module.exports = ctr;

// https://backendcode.tistory.com/136
// https://blog.naver.com/tinea17/222254927373