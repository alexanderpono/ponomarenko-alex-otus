var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const db = require('../service/db');
const { ERR, Privileges } = require('../constants');
const { object, string, number, date, array } = require('yup');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), function (req, res, next) {
    User.find({}, 'name login pass privileges')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send(ERR.SERVER_ERR);
        });
});

const postUserSchema = object({
    login: string().required(),
    name: string().required(),
    pass: string().required(),
    privileges: array().of(string()).required()
});

router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), function (req, res, next) {
    postUserSchema
        .validate(req.body)
        .then((validUser) => {
            const user = new User(validUser);
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
        })
        .catch((err) => {
            if (Array.isArray(err.errors)) {
                res.status(400).send(ERR.VALIDATE_ERR(err.errors));
            } else {
                console.log('validate err=', err);
                res.status(500).send(ERR.SERVER_ERR);
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

const putUserSchema = object({
    login: string(),
    name: string(),
    pass: string(),
    privileges: array().of(string())
});

router.put(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    function (req, res, next) {
        putUserSchema
            .validate(req.body)
            .then((validUser) => {
                User.updateOne(
                    { _id: req.params.id },
                    {
                        $set: {
                            name: validUser.name,
                            login: validUser.login,
                            pass: validUser.pass
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
            })
            .catch((err) => {
                if (Array.isArray(err.errors)) {
                    res.status(400).send(ERR.VALIDATE_ERR(err.errors));
                } else {
                    console.log('validate err=', err);
                    res.status(500).send(ERR.SERVER_ERR);
                }
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
