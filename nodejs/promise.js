const flag = true;
const promise1 = new Promise((resolve,reject) =>{
    // 여기서 resolve, reject 는 고정된 변수명이 아님.
    // 두개 변수명을 a b 로 바꿔도 상관없다. 
    // 다만 a, b로 바꾸면 아래 if문도 a(메시지) b(메시지) 형식으로 넣어줘야함
    if(flag){
        resolve('if 값이 true 일때 출력할 문구 resolve 객체에 저장');
    }else{
        reject('if 값이 false 일때 출력할 문구 reject 객체에 저장!');
    }
});

console.log('다른 작업1');
console.log('다른 작업2');
console.log('다른 작업3');
console.log('다른 작업4');

promise1
    .then((resolveMsg) =>{
        console.log("promise1 객체의 결과값이 true 일 때 resolve 값을 찍는다");
        console.log(resolveMsg);
    })
    .then(() =>{
        console.log("true일 때 한 번 더 찍는거");
        // .then 은 계속 이어서 쓸 경우 모두 실행한다.
    })
    .catch((rejectMsg) =>{
        console.log("promise1 객체의 결과값이 false 일 때 reject 값을 찍는다");
        console.log(rejectMsg);
    })
    .catch((rejectMsg) =>{
        // catch 는 연속으로 써도 찍히지 않는다.
        console.log("false일 때 한 번 더 찍는거");
        // 실행하지 않음.
        
    });