const value = require('./var.js');
const user = require('./folder1/user.js');
// 구조분해할 때엔 require(경로/파일) 에서 export 해줄때 쓴 변수명을 똑같이 써야한다.
const {userAge, userName} = require('./folder1/user.js');
// 함수 모듈(구현한 기능) 가져오기
const myFunc1 = require('./myFunc1.js');
// 경로 잘 보기
const user2 = require('./folder2/user2.js');

console.log(`show1 찍기 == ${user.userAge}`);
console.log(`show1 찍기 == ${value.varA}`);

console.log(`구조분해 변수 찍기 == ${userAge}`);
console.log(`구조분해 변수 찍기 == ${userName}`);

// 함수모듈 찍어보기
myFunc1();            // 내 이름은 김삼순
console.log(myFunc1); // [Function: printName] 으로 출력된다.

// user2 찍기
console.log(user2.user2Name);
console.log(user2.user2Age);
