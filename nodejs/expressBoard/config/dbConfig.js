var oracledb = require('oracledb');

const lg = console.log;

// 오라클 db 정보
const odbSetting = {
    user: "nodeboard",
    password: "nodeboard",
    connectString: "localhost/xe"
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


const odbCtr = {};

odbCtr.runQuery = (query) => {
    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        libDir: 'C:/instantclient-basic-windows.x64-21.10.0.0.0dbru/instantclient_21_10'
    });
    
    lg(query);
    oracledb.getConnection(
	    odbSetting,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                return;
            }

            // let query = 'select * from nodeboard'; // 이걸 인자로 받아옴

            // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
            connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
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

lg('dbConfig');
module.exports = odbCtr;