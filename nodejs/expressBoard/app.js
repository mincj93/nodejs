const express = require('express');
const path = require('path');
const router = express.Router();

const boardRouter = require('./routes/board');

const app = express();
const lg = console.log;

// app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/board', boardRouter);

// app.get('/', (req,res) =>{
//     res.sendFile(__dirname + "/public/main.html");
// });

app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/public/main.html");
});

router.get('/board', (req, res) =>{
    res.sendFile('/', boardRouter);
});

app.listen(3000, () =>{
    console.log('서버실행 3000 포트');
});