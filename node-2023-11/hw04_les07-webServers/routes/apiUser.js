var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;

router.get('/', function (req, res, next) {
    User.find({}, 'name login pass')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.post('/', function (req, res, next) {
    const user = new User(req.body);

    user.save()
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(400).send({ error: 'Validation error', err });
            } else {
                return res.status(500).send({ error: 'Server error' });
            }
        });
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
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

router.put('/:id', function (req, res, next) {
    User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                login: req.body.login,
                pass: req.body.pass
            }
        }
    )
        .then((user) => {
            if (!user) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send({});
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
});
router.delete('/:id', function (req, res, next) {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send({});
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
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
