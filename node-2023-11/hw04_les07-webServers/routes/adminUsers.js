var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const db = require('../service/db');
const passport = require('passport');
const { NO_PRIV, SERVER_ERR } = require('../constants');

router.get('/', passport.authenticate('basic', { session: false }), function (req, res, next) {
    if (!db.isAdmin(req.user)) {
        res.status(403).send(NO_PRIV);
        return;
    }
    User.find({}, 'name login pass')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send(SERVER_ERR);
        });
});

router.post('/', passport.authenticate('basic', { session: false }), function (req, res, next) {
    if (!db.isAdmin(req.user)) {
        res.status(403).send(NO_PRIV);
        return;
    }
    const user = new User(req.body);
    user._id = db.getNewObjectId();

    user.save()
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(400).send({ error: 'Validation error', err });
            } else {
                return res.status(500).send(SERVER_ERR);
            }
        });
});

router.get('/:id', passport.authenticate('basic', { session: false }), function (req, res, next) {
    if (!db.isAdmin(req.user)) {
        res.status(403).send(NO_PRIV);
        return;
    }
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send(SERVER_ERR);
        });
});

router.put('/:id', passport.authenticate('basic', { session: false }), function (req, res, next) {
    if (!db.isAdmin(req.user)) {
        res.status(403).send(NO_PRIV);
        return;
    }
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
            return User.findById(req.params.id);
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send(user);
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
});

router.delete(
    '/:id',
    passport.authenticate('basic', { session: false }),
    function (req, res, next) {
        if (!db.isAdmin(req.user)) {
            res.status(403).send(NO_PRIV);
            return;
        }
        User.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(204).send({});
            })
            .catch((err) => {
                console.log('delete err=', err);
                res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
            });
    }
);

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
