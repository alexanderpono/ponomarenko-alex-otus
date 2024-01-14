var express = require('express');
var router = express.Router();
const Person = require('../service/mongoose').Person;

router.get('/', function (req, res, next) {
    Person.find().then((persons) => {
        res.send(persons);
    }).catch((err) => {
        res.status(500).send({error: 'Server error'});
    });
});

router.post('/', function (req, res, next) {
    const person = new Person(req.body);

    person.save()
    .then((person) => {
        res.status(201).send(person);
    })
    .catch((err) => {
        if (err.name === 'ValidationError') {
            return res.status(400).send({error: 'Validation error', err});
        } else {
            return res.status(500).send({error: 'Server error'});
        }
    });
});

router.get('/:id', function (req, res, next) {
    Person.findById(req.params.id)
    .then((person) => {
        if (!person) {
            return res.status(404).send({error: 'Not found'});
        }
        res.send(person);
    })
    .catch((err) => {
        res.status(500).send({error: 'Server error'});
    });
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
