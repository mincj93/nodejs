// 파일시스템 접근 모듈
const fs2 = require('fs').promises;  
// 이건 fs1과 같지만 promise 형식을 지원하기에 콜백헬 현상 막을 수 있음. 즉 fs2 방식을 많이 쓰자.

/*
// 콜백형식으로 쓸 때
fs1.readFile('../readme.txt', (err,data) =>{
    if(err){
        //에러처리
        throw err;
    }
    console.log(data);  
    // <Buffer eb 82 98 eb a5 bc 20 ec 9d bd ec 96 b4 eb b4 90 eb 9d bc 7e 21>
    console.log(data.toString());
    // 나를 읽어봐라~!
});
*/

const ctr = {};

// promise 형식으로 쓸 때
// promise 형식을 지원하기 때문에 async await 형식도 쓸 수 있다. ★
ctr.readFile = () =>{
    console.log('파일읽기');
    fs2.readFile('./readme.txt')
    .then((data) =>{
        // 성공 했을 때
        console.log(data);
        console.log(data.toString());
    })
    .catch((err) =>{
        //실패했을 때
        console.log(err);
        throw err;
    });
}

module.exports = ctr;