var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('get users');
});
router.post('/', function (req, res, next) {
    res.send('post user');
});

router.get('/:id', function (req, res, next) {
    res.send('get user ' + req.params.id);
});
router.put('/:id', function (req, res, next) {
    res.send('put user' + req.params.id);
});
router.delete('/:id', function (req, res, next) {
    res.send('delete user' + req.params.id);
});

router.get('/:id/rate', function (req, res, next) {
    res.send(`get rates for user ${req.params.id}`);
});
router.post('/:id/rate', function (req, res, next) {
    res.send(`post rate for user ${req.params.id}`);
});

router.get('/:id/rate/:rateid', function (req, res, next) {
    res.send(`get rate ${req.params.rateid} for user ${req.params.id}`);
});
router.put('/:id/rate/:rateid', function (req, res, next) {
    res.send(`put rate ${req.params.rateid} for user ${req.params.id}`);
});
router.delete('/:id/rate/:rateid', function (req, res, next) {
    res.send(`delete rate ${req.params.rateid} for user ${req.params.id}`);
});

module.exports = router;
