var oracledb = require('oracledb');

const lg = console.log;

const odb = {};

odb.config = {
    user: "nodeboard",
    password: "nodeboard",
    connectString: "localhost/orcl"
};

lg('dbConfig');
module.exports = odb;