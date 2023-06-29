// oracledb 설정 관련 참고 https://m.blog.naver.com/scw0531/221169287236
const oracledb = require('oracledb');
const path = require('path');
const ejs = require('ejs');

const lg = console.log;

const odb = {};

// 오토커밋 설정
oracledb.autoCommit = true;

// 오라클 db 정보
odb.odbCfg = {
    user: "nodeboard",
    password: "nodeboard",
    connectString: "localhost/orcl"
};




// 라이브러리 시동
odb.initClt = () => { 
    //lg('path출력',path.join(__dirname,'./odbLib'))
    oracledb.initOracleClient({
        // 오라클 DB 에선 라이브러리 세팅이 필요하다고 함.
        // 라이브러리를 다운로드 받고, 받은 라이브러리의 위치를 넣어줘야함.
        // (라이브러리 경로에 한글있으면 에러 뜸)
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





// readList 실행기 본체. 
// return 값 = 쿼리결과값을 json 형태로 가져온 배열
odb.RConn = (query, req, res, url) => {
    // param 은 req 이다.
    lg('전체출력', url, res);

    odb.initClt(); // 라이브러리 시동

    oracledb.getConnection(
        odb.odbCfg,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                return;
            }
            lg('RConn 실행');
            // connection이 성공할시에 query문을 수행하여 result에 JSON 객체를 받아옴
            connection.execute(query, {}, {outFormat:oracledb.OBJECT}, (err, result) => {
                if(err) {
                    console.error(err.message);
                    odb.doRelease(connection);
                    return;
                }
            
                lg('List 조회 완료 \n결과 ', result.rows[0].BRD_IDX);

                odb.doRelease(connection);
                let lists = result.rows;
                // return lists;
                res.render(url, {lists : lists});
            });
        }
    );// oracledb.getConnection
}; // odb.RConn

// create update delete 실행기 본체.
// 결과값 = 쿼리결과로 영향받은 행의 총 개수(정수값)
// 3개 DML (data manipulation language)은 쿼리만 다를뿐 동일하다고 함.
odb.CUDConn = (query, params) => {
    // param 은 formData(화면에서 받은 데이터들을 json형식으로 가져온 것들) 이다.
    lg('CUDConn params == ',params);
    odb.initClt(); // 라이브러리 시동

    oracledb.getConnection(
        odb.odbCfg,
        function(err, connection) {
            if(err) {
                console.error('getConnErr',err.message);
                return;
            }
            
            lg('CUDConn 실행');

            // 사용자가 보내준 값을 쿼리에 설정하기 위해 배열에 담음
            // (nodeboard_seq.NEXTVAL , 'nodeboard title1', 'nodeboard content1', 'nodeboard writer1', to_char(sysdate, 'YYYYMMDDHH24MISS'));
            const queryValues = [
                params.brd_title,
                params.brd_content,
                params.brd_writer
            ];

            connection.execute(query, queryValues, {outFormat:oracledb.OBJECT}, (err, result) => {
                if(err) {
                    console.error(err.message);
                    odb.doRelease(connection);
                    return;
                }
                
                // /api/customers 입력시 App.js에 데이터 전송
                lg('CUDConn 성공. \n결과 ',result.rowsAffected);
                odb.doRelease(connection);
                const lists = result.rows;
                return lists;
            });
        }
    );// oracledb.getConnection
}; // odb.getConn

lg('odb');
module.exports = odb;