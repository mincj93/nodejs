// async/await
// promise 의 진화버전


function sum() {
    console.log('sum 함수 실행');
    return 1+2;
}

// 기본 틀
async function myFunc1(a){
    let str = await console.log(a + '를 찍다');
    let sum1 = await sum();
    console.log(sum1);
}


myFunc1('문자열~ ');