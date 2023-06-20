var oracledb = require('oracledb');

const lg = console.log;

const odb = {
    user: "nodeboard",
    password: "nodeboard",
    connectString: "localhost/xe"
};

lg('dbConfig');
module.exports = odb;