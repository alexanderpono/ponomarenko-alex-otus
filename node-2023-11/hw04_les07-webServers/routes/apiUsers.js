var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;

router.get('/', function (req, res, next) {
    User.find({}, 'name login')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, 'name login')
        .then((user) => {
            if (!user) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.get('/me', function (req, res, next) {
    res.send(`get me`);
});

router.put('/me', function (req, res, next) {
    res.send(`put me`);
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
