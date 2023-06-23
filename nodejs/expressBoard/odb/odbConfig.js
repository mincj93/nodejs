const oracledb = require('oracledb');

const lg = console.log;

// 오라클 db 정보
const odbSetting = {
    user: "nodeboard",
    password: "nodeboard",
    connectString: "localhost/xe"
};

lg('dbConfig');
module.exports = odbSetting;