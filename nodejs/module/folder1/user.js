const userName = 'mincj';
const userAge = 31;

module.exports = {
    userAge,
    userName,
}
// 위 변수들 userAge, userName 을 구조분해 해서 사용할 땐 
// 여기에서 보내준 변수명과 동일하게 userAge userName 으로 사용해야한다.
// 구조분해를 하지 않을 경우엔 해당 파일에서 require 할때 지정한 변수명에 
// 변수명.userName 변수명.userAge로 쓰면 된다.
