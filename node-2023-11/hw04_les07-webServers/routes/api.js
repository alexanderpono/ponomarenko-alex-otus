var express = require('express');
var router = express.Router();

router.post('/auth', function (req, res, next) {
    res.send('post auth');
});

router.get('/profile', function (req, res, next) {
    res.send('get profile');
});
router.put('/profile', function (req, res, next) {
    res.send('put profile');
});

router.get('/tag', function (req, res, next) {
    res.send('get tag');
});
router.post('/tag', function (req, res, next) {
    res.send('post tag');
});

router.get('/tag/:id', function (req, res, next) {
    res.send('get tag ' + req.params.id);
});
router.put('/tag/:id', function (req, res, next) {
    res.send('put tag ' + req.params.id);
});
router.delete('/tag/:id', function (req, res, next) {
    res.send('delete tag ' + req.params.id);
});

router.post('/reset', function (req, res, next) {
    res.send({ result: 'post reset' });
});

module.exports = router;
