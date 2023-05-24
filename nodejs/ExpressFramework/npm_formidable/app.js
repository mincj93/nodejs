const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();
const lg = console.log;

app.get('/', (req,res) =>{
    console.log('tsetset ');
    res.sendFile(path.join(__dirname,'index.html'));
});

// 파일 업로드. 모듈은 fs와 formidable이 필요하다.
// 화면의 form 태그의 action 속성에 post 를 명시했으므로 post메소드를 타야한다.
app.post('/uploadFile', (req, res) =>{

    let uploadPath = path.join(__dirname, 'uploads'); // 업로드 할 폴더 경로
    // 업로드할 폴더의 경로 존재 여부 확인.
    if(!fs.existsSync(uploadPath)){
        // 업로드할 폴더 없으면 만듦.
        lg('폴더가 없으므로 폴더를 생성합니다.');
        fs.mkdirSync(uploadPath);
    }else{
        lg('폴더가 존재합니다.');
    }
    
    // formidable 객체 선언. 여러 파일이 한번에 넘어온다면 const form = formidable({multiples: true}) 을 써주자
    const form = new formidable.IncomingForm(); 
    
    // 화면에서 submit 버튼 눌렀을 때 form 태크 내부 요소들을 parsing 한다.
    // form.parse(req, (에러, 필드객체, 파일객체) => {콜백처리});
    // 위와 같이 콜백처리 부분에 에러,필드,파일 객체가 각각 자리한다.
    // 필드객체는 화면단에서 form 태그 내부의 input type="file" 이 아닌 값들을 가져온다. 객체들은 태그의 name 속성에 써준 값으로 찾을 수 있다.
    form.parse(req, (err, fields, file) =>{

        // callback 함수 내부에 있기에 모든 처리가 끝난 상황.
        // 따라서 parsing 중 에러가 났을 경우 먼저 에러를 처리해준다.
        if(err){
            lg('form parsing 중 에러 발생 ',err);
            res.sendFile(path.join(__dirname,'errorPage.html'));
        }

        // file 을 출력해보면 마찬가지로 해당 태그의 name값을 기준으로 보내준 파일의 정보를 볼 수 있다.
        // 속성중에 newfilename 이 있는데 formidable이 파일명을 난수화 시켜서 새로 파일명을 준 것임.
        lg('file 출력 ', file.name);
        let oldPath = file.myFile1.filepath;
        lg('file.name값.속성 으로 찾을 수 있다. == ', oldPath.split('\\'));
        lg('fields 출력 ', fields);
        lg('fields.file1Title ', fields.file1Title);

        /*
         formidable모듈을 사용해서 파일을 가져오면 파일을 우선 가상 폴더에 저장을 해둔다. 
         업로드할 파일을 원하는 경로에 저장해주기 위해선 가상 폴더 안의 파일을 복사해서 특정 경로에 넣고 가상 폴더를 삭제를 해줘야 한다. 
         이러한 전체 과정을 renameSync 메소드가 처리해준다. 매개변수로 가상 폴더와 저장 경로를 받는다.
        */
        fs.renameSync(oldPath, uploadPath +'/'+ file.myFile1.originalFilename);

        res.send('아직까지 오류 없음');
    });
    
});


app.listen(3000, () => {
    lg('3000번 포트');
})