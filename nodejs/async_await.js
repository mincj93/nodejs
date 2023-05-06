// async/await
// promise 의 진화버전. async 와 await은 한 세트이다. 
// await을 쓰려면 꼭 async function 함수명() {} 으로 감싸주자
// ※ promise 에서 성공시 .then 실패시 catch로 가듯이 
// ※ async await은 에러 처리를 try catch 문으로 해줘야함. await 에서 에러가 날 수 있기 때문.


// 기본 틀
async function myFunc1(a){
    try {
        let str = await console.log(a + '를 찍다'); 
        // await 키워드가 .then 키워드를 대체한다고 보면 된다.
    } catch (error) {
        console.log(error);
    }
    
    try {
        let sum1 = await sum();
        console.log(sum1);
    } catch (error) {
        console.log(error);
    }
    
    
}

function sum() {
    console.log('sum 함수 실행');
    return 1+2;
} 

myFunc1('문자열~ ');