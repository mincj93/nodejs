const oracledb = require('oracledb');
const path = require('path');

const lg = console.log;

const odb = {}

// 오라클 db 정보
odb.odbCfg = {
    user: "nodeboard",
    password: "nodeboard",
    // connectString: "localhost/xe" 집은 orcl 노트북은 xe 로 되어있음..
    connectString: "localhost/orcl"
};




// 라이브러리 시동
odb.initClt = () => { 
    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        // 라이브러리를 다운로드 받고, 받은 라이브러리의 위치를 넣어줘야함.
        libDir: path.join(__dirname,'./odbLib')
    });
    // 100 mb 용량을 넘어가면 git 에서 막음. 1GB 까지는 무룐데 git lfs 를 통해서 관리해줘야함.
    // https://hbase.tistory.com/221 참고
}; // odb.initClt




// connection 해제
odb.doRelease = (connection) => {
	connection.release((err) => {
		if(err) {
			console.error(err.message);
		}
		lg(`connection 해제`);
    })
};





// 실행기 본체.
odb.getConn = (query, params) => {

    odb.initClt(); // 라이브러리 시동

    oracledb.getConnection(
        odb.odbCfg,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                return;
            }

            // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
            connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
                if(err) {
                    console.error(err.message);
                    odb.doRelease(connection);
                    return;
                }
                lg('조회 성공');

                // /api/customers 입력시 App.js에 데이터 전송
                lg(result.rows[0].BRD_IDX);
                odb.doRelease(connection);
                const lists = result.rows;
                return lists;
            });
        }
    );// oracledb.getConnection
}; // odb.getConn

lg('odb');
module.exports = odb;