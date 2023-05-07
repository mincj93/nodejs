const fs = require('fs');

const readStream = fs.createReadStream('../longReadme.txt', { highWaterMark: 16 });
// createReadStream(파일경로/파일.형식 , { highWaterMark: byte단위숫자지정 } )
// highWaterMark 를 지정해주면 해당 숫자만큼 byte 단위로 자른다. 지정하지 않으면 전체 바이트 단위가 보임.

// highWaterMark 를 지정하는 이유? 
// 서버 메모리가 20byte만 있어도 20byte 보다 큰 파일을 조각조각 내서 보내기에 서버가 터지지 않고 효율적으로 쓸 수 있다.

const data = [];  // 빈배열 만들고

readStream.on('data', (chunk) => {  // chunk 는 ../longReadme.txt 파일을 조각낸 것
  data.push(chunk); // 조금씩 조각낸 청크를 배열에 추가.
  console.log('data :', chunk, chunk.length); // chunk.length 바이트 단위 크기 
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString()); // concat으로 조각들 전부 합침
});

// stream도 비동기이기 때문에 에러처리를 해준다.
readStream.on('error', (err) => {
  console.log('error :', err);
});
