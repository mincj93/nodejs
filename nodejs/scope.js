// 주석을 풀러서 해보자

/*
// var
function a(){ 
    var y=3;
}
console.log('y값은 = '+y); // 에러가 난다. var는 함수스코프이기에 변수 y는 함수 a() 밖에서 쓸 수 없음
*/

//-------------------------------------------------------------------

/*
//const
if(true){
        const x=3;
    }
console.log(x); // 에러가 난다. 블록( { } )을 빠져나오지 못하기 때문.
*/

const b = {name : 'mcj'};
console.log(b.name);
b.name = 'mincj93'; 
console.log(b.name); // 정상작동

//-------------------------------------------------------------------

// let
let foo = 123; // 전역 변수

{
    let foo = 456; // 지역 변수 
    let bar = 456; // 지역 변수
}

console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined

//-------------------------------------------------------------------
