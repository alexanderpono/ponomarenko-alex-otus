var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', { title: 'Пожалуйста, авторизуйтесь' });
});

module.exports = router;
