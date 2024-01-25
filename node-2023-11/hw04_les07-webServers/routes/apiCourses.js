var express = require('express');
var router = express.Router();
const Course = require('../service/mongoose').Course;
const db = require('../service/db');
const { Privileges } = require('../constants');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), function (req, res, next) {
    Course.find({})
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), function (req, res, next) {
    const course = new Course(req.body);
    course._id = db.getNewObjectId();

    course
        .save()
        .then((course) => {
            res.status(201).send(course);
        })
        .catch((err) => {
            console.log('post err=', err);

            if (err.name === 'ValidationError') {
                return res.status(400).send({ error: 'Validation error', err });
            } else {
                return res.status(500).send({ error: 'Server error' });
            }
        });
});

router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), function (req, res, next) {
    Course.findById(req.params.id)
        .then((course) => {
            if (!course) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send(course);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.put('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), function (req, res, next) {
    Course.updateOne(
        { _id: req.params.id },
        {
            $set: {
                description: req.body.description,
                author_id: req.body.author_id,
                difficulty: req.body.difficulty
            }
        }
    )
        .then((course) => {
            if (!course) {
                return res.status(404).send({ error: 'Not found' });
            }
            return Course.findById(req.params.id);
        })
        .then((course) => {
            if (!course) {
                return res.status(404).send({ error: 'Not found' });
            }
            res.send(course);
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
});

router.delete(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.courses]),
    function (req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(204).send({});
            })
            .catch((err) => {
                console.log('put err=', err);
                res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
            });
    }
);

module.exports = router;
