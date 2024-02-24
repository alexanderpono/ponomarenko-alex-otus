const express = require('express');
const fs = require('fs');
const path = require('path');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    fs.createReadStream(path.join(__dirname, '../views/index.html')).pipe(res);
});

module.exports = router;
