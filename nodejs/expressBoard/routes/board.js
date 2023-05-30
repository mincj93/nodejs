const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();
const lg = console.log;

// app.get('/board/main', function(req,res) {
//     res.sendFile(__dirname + "/public/board/boardMain.html")
// });

router.get('/', (req, res) => {
    lg('boardMain');
    res.sendFile(path.join(__dirname , "../public/board/boardMain.html"));
});

module.exports = router;