const express = require('express');
const path = require('path');
const router = express.Router();
const ejs = require('ejs');

const boardRouter = require('./routes/board');

const app = express();
const lg = console.log;

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/board', boardRouter);

app.set('view engine', 'ejs');

// app.get('/', (req,res) =>{
//     res.render(__dirname + "/public/main.html");
// });

app.get('/', (req,res) =>{
    res.render(__dirname + "/public/main.ejs");
});

router.get('/board', (req, res) =>{
    res.render('/', boardRouter);
});

app.listen(3000, () =>{
    console.log('서버실행 3000 포트');
});