const fs = require('fs');
const fs2 = require('fs').promises;

// 비동기 파일 읽기.
// 비동기는 결국 순서를 확정적으로 순서대로 실행시킬 수 없기 때문에 차례대로 실행되지 않는다.
// 하지만 동기방식으로 느리지만! 차례대로 실행시킬 수 있다. fs.readFileSync 를 쓰면됨

// ★★★궁극적으로 비동기식을 유지하면서 빠르게 "순서대로"를 지키면서 하려면 async await으로 하나하나 실행시켜주면 된다.
console.log('비동기 파일 읽기 시작 (빠르지만 순서가 안 지켜짐)');
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});

fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('4번', data.toString());
});
console.log('비동기 파일 읽기 끝');


// -----------------------------------------------------

//동기식
console.log('동기 파일 읽기 시작.(느리지만 순서가 지켜짐)');
// 느린 이유는 동기식으로 한개의 함수가 실행되고 끝날 때가지 아무것도 하지 않기 때문.
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});

fs.readFile('../readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('4번', data.toString());
});
console.log('동기 파일 읽기 끝');

// ----------------------------------------------------
//비동기식
console.log('비동기 순서대로 파일 읽기 시작.★★★ 빠르면서 순서 지키기');
// ★★★주의!! const fs2 = require('fs').promises;
// promises 를 사용해야지만 async await 사용 가능!
async function main(){
  let data1 = await fs2.readFile('../readme.txt');
  console.log('1번', data1.toString());

  let data2 = await fs2.readFile('../readme.txt');
  console.log('2번', data2.toString());

  let data3 = await fs2.readFile('../readme.txt');
  console.log('3번', data3.toString());

  let data4 = await fs2.readFile('../readme.txt');
  console.log('4번', data4.toString());
}
main();
console.log('비동기 순서대로 파일 읽기 끝');

// 출력을 해보면
/*
비동기 파일 읽기 시작 (빠르지만 순서가 안 지켜짐)
비동기 파일 읽기 끝
동기 파일 읽기 시작.(느리지만 순서가 지켜짐)
동기 파일 읽기 끝
비동기 순서대로 파일 읽기 시작.★★★ 빠르면서 순서 지키기
비동기 순서대로 파일 읽기 끝
2번 나를 읽어봐라~! // 랜덤
1번 나를 읽어봐라~! // 랜덤
3번 나를 읽어봐라~! // 랜덤
4번 나를 읽어봐라~! // 랜덤
1번 나를 읽어봐라~! // 랜덤
2번 나를 읽어봐라~! // 랜덤
3번 나를 읽어봐라~! // 랜덤
4번 나를 읽어봐라~! // 랜덤
1번 나를 읽어봐라~! // 순서대로
2번 나를 읽어봐라~! // 순서대로
3번 나를 읽어봐라~! // 순서대로
4번 나를 읽어봐라~! // 순서대로
*/
// 이렇게 나오는데 console.log는 먼저 전부 실행되고 나머지 함수들은 호출스택에 들어가서 쌓인뒤에
// 차례대로 실행되기에 저렇게 나오는거다.