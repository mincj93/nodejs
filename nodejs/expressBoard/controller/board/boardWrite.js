const fmd = require('formidable');
const form = new fmd.IncomingForm();

const lg = console.log;
const ctr = {};

ctr.writeBoard = (contents) => {
    // lg(form);
    form.parse(req, (err, fields, file) =>{
        if(err){
            lg('form parsing 중 에러 발생 ',err);
            res.sendFile(path.join(__dirname,'errorPage.html'));
        }
        
        lg('fields 출력1 ', fields.brd_title);
        lg('fields 출력2 ', fields.brd_content);
        lg('fields 출력3 ', fields.brd_writer);

    });

};

module.exports = ctr;