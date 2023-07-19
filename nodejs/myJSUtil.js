/* 공통모듈(기능) 기록용 */

const fs = require("fs");
const crypto = require("crypto");
const lg = console.log;
const util = {};

// http get/post 로 배열 정보를 보낼경우, 입력값의 배열이 해체되어 보내진다.
// 키값을 추적하여 원래의 배열로 반환하는 함수.
util.bodyParserArray = (input, arrayName, dataKeys) =>{
    let dataN = 0;
    let aryN = 0;
    let data = [];
    try {
        for(let aryKeyName in input){
            let value = input[aryKeyName];
            dataN++;
            aryN = Math.ceil(dataN / dataKeys.length)-1;
            let dataKeyN = (dataN -1) % dataKeys.length;

            if(dataKeyN == 0) data.push({});

            for(let dtKyN in dataKeys){
                if( aryKeyName == arrayName + "[" + aryN + "]" + dataKeys[dtKyN] + "]"){
                    data[aryN][dataKeys[dtKyN]] = value;
                }
            }
        }
    } catch (error) {}
    if (data.length == aryN +1) return data;
};


// datetime 문자열을 단순 문자열로 파싱
// ex) 2023-04-10T16:31:06+09:00
util.strDateShorter = (strTime) => {
    let year = strTime.substr(0,4);
    let month = strTime.substr(5,2);
    let day = strTime.substr(8,2);
    let hour = strTime.substr(11,2);
    let minute = strTime.substr(14,2);
    let second = strTime.substr(17,2);
    return year + month + day + hour + minute + second;
};

// 현재시간반환 (YYYYMMDDHHmmSS)
// form 의 텍스트값을 비교해서 원하는 형식을 선택하는것.
util.dateTime = (date, form) =>{
    date = date || new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // 9시간 // 런던표준시에 맞춤

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    if(form == "yearMonth") return year + month;
    else if( div == "yearMonthDay") return year + month + day + 000000;
    else if( div ) return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
    else return year + month + day + hour + minute + second;
}


// 확장자 추출
util.getExt = (fileName) => {
    return  String(fileName)
            .substring(fileName.lastIndexOf(".") + 1, fileName.length)
            .toLocaleLowerCase();
}

// Json 파일 reader
util.readJsonFile1 = (jsonFile) => {
    let json = "";
    json = fs.readFileSync(jsonFile).toString("utf8");
    if (json) {
        try {
            json = JSON.parse(json);
        } catch (error) {}
        if( typeof json === "object" ) return json;
    }
};
util.readJsonFile2 = (jsonFile, fnc) => {
    if (fs.existsSync(jsonFile)) {
        fs.readFile(jsonFile, "utf8", (er,json) => {
            if(!er && json){
                try {
                    json = JSON.parse(json);
                } catch (error) {}
                if (typeof json === "object" && typeof fnc === "function")
                    fnc(json, "config saved success.");
                else if (typeof fnc === "function")
                    fnc(false, "config JSON parsing error.");
              } else if (typeof fnc === "function")
                    fnc(false, "config JSON parsing error.");
        });
    } else if (typeof fnc === "function") fnc(false, "config file not found");
};

// 글자수 byte 사이즈 계산
util.byteSize = (str) => {
    let byte = 0;
    for(let i =0; i < str.length; i++) {
        str.charCodeAt(i) > 127 ? (byte += 3) : byte++;
    }
    lg(`바이트값 = ${byte}`);
    return byte;
}

// 무작위 랜덤 스트링 만들기
util.randomString = (num, ch) => {  // num = 문자열길이 지정, ch = 조합할 알파벳 문자열.
    num = num || 5;
    ch = ch || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let rs = ""; // 결과문자열
    for(let i = 0; i < Number(n); i++) {
        rs += ch[Math.floor(Math.random() * ch.length)];
    }
    return rs;
};

// 배열 안에 배열 값들 중 key 값으로 지정가능한 것을 기준으로 만든뒤
// 해당 기준값만 입력하면 정보를 찾을 수 있는 모듈
// ------------------------------------------------------------
let objectArr = [
    [
         1,
         'kim',
         10
    ],
    [
         2,
         'park',
         20
    ],
    [
         3,
         'jeo',
         30
    ],
    [
         4,
         'kwak',
         40
    ],
    [
         5,
         'han',
         50
    ],
    [
         6,
         'soo',
         60
    ],
]

function findObj(objArr, id){
    let objects = {};   // 배열 내에 들어있는 오브젝트
    // lg(objArr, id)
    lg('########################');
    for(let i in objArr){
        let obj = objArr[i];
        objects[obj[0]] = obj;
    }

    lg(objects)
    return objects[id][1];
}

lg(findObj(objectArr , 2));

// 정보찾기 모듈 끝
// ------------------------------------------------------------
