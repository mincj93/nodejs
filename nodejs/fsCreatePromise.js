const fs = require('fs').promises;
const constants = require('fs').constants;

// fs.access(경로/폴더명 , 두번째인자들)
// 두번째 인자들은 폴더가 있는지 없는지 판단해주는 애들. 그냥 써라.
fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
// F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
    // fs.open('./folder/file.js', 'w')  w 를 인자값으로 주면 파일을 만든다 라는뜻.
    // fs.open('./folder/file.js', 'a')  a 를 인자값으로 주면 기존파일에 글자 추가하는 것.
    // fs.open('./folder/file.js', 'r')  r 를 인자값으로 주면 파일 읽기.
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
    // fs.rename('파일경로/기존파일명', '경로/바꿀파일명');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });
