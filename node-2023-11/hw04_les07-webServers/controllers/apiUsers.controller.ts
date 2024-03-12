var express = require('express');
const User = require('../models/User').User;

function get(req, res, next) {
    User.find({}, 'name login')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
}

function getById(req, res, next) {
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
}

module.exports = {
    get,
    getById
};
