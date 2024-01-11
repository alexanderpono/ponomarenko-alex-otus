var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('courses', { title: 'Курсы' });
});

router.get('/:id', function (req, res, next) {
    res.render('course', { id: req.params.id, title: 'Курс' });
});

module.exports = router;
