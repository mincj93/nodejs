const fmd = require('formidable');
const form = new fmd.IncomingForm();

const lg = console.log;
const ctr = {};

ctr.writeBoard = (req) => {
    form.parse(req, (err, fields, file) =>{
        if(err){
            lg('form parsing 중 에러 발생 ',err);
        }
        lg(file.brd_file1);
    });

};

module.exports = ctr;