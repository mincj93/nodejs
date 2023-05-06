const varjs = require('../../module/var.js');

console.log(`folder1 의 show2 찍기 == ${varjs.varA}`);
console.log(`folder1 의 show2 찍기 == ${varjs.varB}`);

//구조분해
const {varA,varB} = require('../../module/var.js');
console.log(`folder1 의 구조분해 == ${varA}`);
console.log(`folder1 의 구조분해 == ${varB}`);