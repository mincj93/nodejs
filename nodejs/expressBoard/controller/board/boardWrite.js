const fmd = require('formidable');
const form = new fmd.IncomingForm();

const lg = console.log;
const ctr = {};

ctr.writeBoard = (req) => {
    lg(`으악 ${req}`);
    form.parse(req, (err, fields, file) =>{
        lg(file);
        if(err){
            lg(`2`);
            lg('form parsing 중 에러 발생 ',err);
        }
        lg(`3`);
        lg(file.brd_file1);
    });

};

module.exports = ctr;