// 지정 폴더 내부에서 파일과 폴더를 모두 읽어오는 모듈
const fs = require("fs");
const path = require('path');


const lg = console.log;


// 필요한 모듈은 기본 모듈인 fs 와 path 이다.

////////////// 폴더 디렉토리 읽기
const scanner = (fileList, dirList, dirName, opt) =>{
    // 옵션설정
    opt.limitCnt = opt.limitCnt || 0;       // 
    opt.exts = opt.exts || [];              // 확장자를 배열로 받음. ex) .txt, .png, .jpg 등
    opt.sizeFlag = opt.sizeFlag || false;

    let dirPath = dirName.replace(/\\/g, "/");  // 인자로 받아온 경로 구분자를 /로 통일해서 바꿈
    let dirExist = false;      // 경로 존재 유무 확인용

    try {
        dirExist = fs.existsSync(dirPath); // 경로 존재 유무 확인 후 true false 지정
    } catch (error) {
        lg('경로 확인 중 에러 발생', error);
    }

    let fncFlag = false;
    if(typeof opt.fnc === "function") fncFlag = true;

    if(dirExist && (!opt.limitCnt || (opt.limitCnt && fileList.length < opt.limitCnt))){
        
        if(dirPath.slice(-1) != "/") dirPath += "/";

        dirList.push(dirPath);

        let isDir = false;
        try {
            isDir = fs.statSync(dirPath)?.isDirectory();
        } catch (error) {
            lg('경로형식이 맞는지 확인 중 에러');
        }

        let scanList = [];
        if(isDir && Array.isArray(fileList)){
            
            try {
                scanList = fs.readdirSync(dirPath, {withFileTypes: true});
            } catch (error) {
                lg('filelist 경로검사 중 에러 발생');
            }
        } // if

        scanList.forEach((it) => {
            if(it.isDirectory()) {
                let dirNameChild = dirPath + it.name + "/";
                scanner(fileList, dirList, dirNameChild, opt);
            }else {
                const fileExt = path.extname(it.name)?.substring(1)?.toLowerCase();
                if(!opt.limitCnt || (opt.limitCnt && fileList.length < opt.limitCnt)){
                    let pushFlag = false;
                    let fileData = {
                        fileName: it.name,
                        fileExt: fileExt,
                        dirPath: dirPath,
                    };
                    
                    if(opt.sizeFlag){
                        try {
                            fileData,fileSize = fs.statSync(dirPath + it.name)?.size;
                        } catch (error) {
                            
                        }
                    }// if

                    if(Array.isArray(opt.regExp) && opt.regExp[0]){
                        for(let i in opt.regExp){
                            let regExp = opt.regExp[i];
                            try {
                                if(regExp.test(dirPath + it.name) && !pushFlag) {
                                    fileList.push(fileData);
                                    pushFlag = true;

                                    if(fncFlag) opt.fnc(fileData);
                                }
                            } catch (error) {
                                
                            }
                        }// for
                    }// if

                    if(Array.isArray(opt.exts) && opt.exts.indexOf(fileExt) >= 0 && !pushFlag){
                        fileList.push(fileData);
                        pushFlag = true;
                        if (fncFlag) opt.fnc(fileData);
                    }
                }
            }
        });
    }
};



//////////////////////////

const toNumber = (numStr) => {
    return Number(String(numStr).replace(/[^0-9/]/g,""));
};

const sumAll = (obj, key) =>{
    let sum = 0;
    for (let n in obj){
        if (obj[n]){
            sum += toNumber(obj[n][key]);
        }
    }
    return sum;
}

//////////////////////////
const scan = (dirName, opt) => {
    let fileList = [];
    let dirList = [];

    scanner(fileList, dirList, dirName, opt);
    const dirCount = dirList.length;
    const fileCount = fileList.length;

    if(opt.sizeFlag){
        const totalSize = sumAll(fileList, "fileSize");
        return {fileList, fileCount, dirList, dirCount, totalSize};
    }else{
        return {fileList, fileCount, dirList, dirCount};
    }
}

lg('실행ㅇㅇㅇㅇㅇ');

// 경로의 파일 확장자별 추출
lg(scan("C:/Users/PC/Desktop/newfolder/nodejs/nodejs/ExpressFramework/npm_formidable", {
    limitCnt: 0, // 검색파일 제한 수
    sizeFlag: false, // 검색되어 도출된 파일들의 전체 용량 추출 여부 (true 로 하면 느려진다.)
    //regExp: [/\.stories\./], // 검색경로를 배열에 넣는다. 첫번째 인자값으로 넣은 주소 + regExp 경로만 탐색하게 만든다.
                            // regExp 예시)    [/controller/, /Music/, /img/]
    exts: ['json', 'js', 'html'], // 검색확장자 배열
                            // exts 예시) ['png','jpg','gif']
    fnc: (fileData) =>{
        // 검색ㄷ된 파일 하나하나 마다의 콜백함수이다.
        lg("z",fileData.fileName);
    }
}));

// 경로안의 모든 파일 검색하는 것,
lg(scan("C:/Users/PC/Desktop/newfolder/nodejs/nodejs/ExpressFramework/npm_formidable", {
    limitCnt: 0, // 검색파일 제한 수
    sizeFlag: false, // 검색되어 도출된 파일들의 전체 용량 추출 여부 (true 로 하면 느려진다.)
    regExp: [/npm_formidable/], // 검색경로를 배열에 넣는다. 첫번째 인자값으로 넣은 주소 + regExp 경로만 탐색하게 만든다.
                            // regExp 예시)    [/controller/, /Music/, /img/]
    //exts: ['json', 'js', 'html'], // 검색확장자 배열
                            // exts 예시) ['png','jpg','gif']
    fnc: (fileData) =>{
        // 검색ㄷ된 파일 하나하나 마다의 콜백함수이다.
        lg("z",fileData.fileName);
    }
}));