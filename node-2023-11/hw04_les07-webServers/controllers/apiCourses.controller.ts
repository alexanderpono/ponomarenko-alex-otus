var express = require('express');
const Course = require('../models/Course').Course;
import db from '../services/db.service';
const { ERR } = require('../constants');
const { object, string, number, date, array } = require('yup');

function get(req, res, next) {
    Course.find({})
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
}

const postLessonSchema = object({
    description: string().required()
});
const postCourseSchema = object({
    description: string().required(),
    author_id: string().required(),
    difficulty: number().required(),
    lessons: array().of(postLessonSchema).required()
});

function post(req, res, next) {
    postCourseSchema
        .validate(req.body)
        .then((validCourse) => {
            const course = new Course(validCourse);
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

function getById(req, res, next) {
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
}

const putCourseSchema = object({
    description: string(),
    author_id: string(),
    difficulty: number(),
    lessons: array().of(postLessonSchema)
});

function put(req, res, next) {
    putCourseSchema
        .validate(req.body)
        .then((validCourse) => {
            Course.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        description: validCourse.description,
                        author_id: validCourse.author_id,
                        difficulty: validCourse.difficulty
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

function del(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(204).send({});
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
}

module.exports = {
    get,
    post,
    getById,
    put,
    del
};
