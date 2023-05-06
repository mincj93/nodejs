const varjs = require('../../module/var.js');

console.log(`folder1 의 show2 찍기 == ${varjs.varA}`);
console.log(`folder1 의 show2 찍기 == ${varjs.varB}`);

//구조분해
const {varA,varB} = require('../../module/var.js');
console.log(`folder1 의 구조분해 == ${varA}`);
console.log(`folder1 의 구조분해 == ${varB}`);

// folder2 에 있는거 찍기
const user2 = require('.././folder2/user2.js');
console.log(`folder2 값 찍기 == ${user2.user2Name}`);
console.log(`folder2 값 찍기 == ${user2.user2Age}`);
