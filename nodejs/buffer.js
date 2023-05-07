// 한꺼번에 전부 버퍼로 바꿨다가 다시 문자열로 바꾸는 과정
const buffer = Buffer.from('날 버퍼로 바꿔보아라!! 어서 바꾸라!');
console.log('from(): ', buffer);    // 버퍼로 바꿀 대상을 바꾼뒤 출력
console.log('length: ', buffer.length); // byte 단위로 나옴
console.log('toString(): ', buffer.toString()); // 버퍼로 바뀌어서 못 읽는걸 다시 읽을 수 있게 변환

// 스트리밍 방식
// 조각조각 나누어서 array로 보내준다. 받는 쪽에서는 array를 모두 받고 하나로 합쳐서 보면 된다.
const array = [Buffer.from('조금씩 '), Buffer.from('떼가지고 '), Buffer.from('보내주고 '), Buffer.from('다시합칠거야 ')];
// 나중엔 파일 한개를 통째로 for문 돌려서 하나의 배열로 담고 보내면 될듯.

const buffer2 = Buffer.concat(array); // 배열로 보내진 파일 합치기
console.log('concat():', buffer2.toString()); // 문자열로 변환

// 빈 퍼버 생성 (숫자는 byte 단위 크기 지정)
const buffer3 = Buffer.alloc(5); // 5byte 짜리 빈 버퍼 생성
console.log('alloc():', buffer3);
