var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const db = require('../service/db');
const { Privileges } = require('../constants');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.users]), function (req, res, next) {
    User.find({}, 'name login')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.users]), function (req, res, next) {
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

module.exports = router;
