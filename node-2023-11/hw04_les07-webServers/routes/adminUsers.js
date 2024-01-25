var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const db = require('../service/db');
const { ERR, Privileges } = require('../constants');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), function (req, res, next) {
    User.find({}, 'name login pass privileges')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send(ERR.SERVER_ERR);
        });
});

router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), function (req, res, next) {
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
                return res.status(500).send(ERR.SERVER_ERR);
            }
        });
});

router.get(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    function (req, res, next) {
        User.findById(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ error: 'Not found' });
                }
                res.send(user);
            })
            .catch((err) => {
                res.status(500).send(ERR.SERVER_ERR);
            });
    }
);

router.put(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    function (req, res, next) {
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
    }
);

router.delete(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    function (req, res, next) {
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

module.exports = router;
