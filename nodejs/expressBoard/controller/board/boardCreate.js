const oracledb = require('oracledb');
const formidable = require('formidable');

const odbCfg = require('../../odb/odb.js');
const query = require('../../query/boardQuery.js');


const lg = console.log;

const boardCreate = {};

// boardCreate.createQuery = (req) => {
//     const form = new formidable.IncomingForm();
//     const formData = form.parse(req, (err, fields, file) =>{

//         if(err){
//             lg('form parsing 중 에러 발생 ',err);
//             return;
//         }
//         const originalFilename = file.brd_file1.originalFilename;
//         const oldPath = file.brd_file1.filepath;
//         const fieldData = fields;
//         lg('fieldData',fieldData);

//     });
    
//     //odbCfg.CUDConn(query.insertOne , formData);
// };

boardCreate.createQuery = (req) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, file) =>{
        
        let params = {}; // DB에 입력할 전체 값들

        if(err){
            lg('form parsing 중 에러 발생 ',err);
            return;
        }
        lg('fields',fields);
        params.brd_title = fields.brd_title;
        params.brd_content = fields.brd_content;
        params.brd_writer = fields.brd_writer;

        odbCfg.CUDConn(query.insertOne , params);
    });
};


module.exports = boardCreate;