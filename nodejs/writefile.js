// 파일시스템 접근 모듈
const fs = require('fs').promises;  
// 이건 fs1과 같지만 promise 형식을 지원하기에 콜백헬 현상 막을 수 있음. 즉 fs2 방식을 많이 쓰자.


// promise 형식을 지원하기 때문에 async await 형식도 쓸 수 있다. ★
fs.writeFile('../writeme1.txt' , '글을 써봅니다 writeme1.txt이다.')   // 인자값으로 경로+파일명.형식 , "파일에 쓸 내용" 을 써주면 파일을 새로 만들 수 있다.
    .then(() =>{
        // 성공 했을 때
        return fs.readFile('../writeme1.txt');
    })
    .then((data) =>{
        console.log(data.toString());
    })
    .catch((err) =>{
        //실패했을 때
        console.log(err);
        throw err;
    });