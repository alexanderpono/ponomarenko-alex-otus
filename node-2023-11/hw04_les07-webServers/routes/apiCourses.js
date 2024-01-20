var express = require('express');
var router = express.Router();
const Course = require('../service/mongoose').Course;
const db = require('../service/db');

router.get('/', function (req, res, next) {
    Course.find({}, 'description author_id difficulty')
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

router.post('/', function (req, res, next) {
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

router.get('/:id', function (req, res, next) {
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

router.put('/:id', function (req, res, next) {
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

router.delete('/:id', function (req, res, next) {
    Course.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(204).send({});
        })
        .catch((err) => {
            console.log('put err=', err);
            res.status(500).send({ error: 'Server error' + JSON.stringify(err) });
        });
});

router.get('/:id/file', function (req, res, next) {
    res.send('get files for course' + req.params.id);
});
router.post('/:id/file', function (req, res, next) {
    res.send('post file for course' + req.params.id);
});

router.get('/:id/file/:fileid', function (req, res, next) {
    res.send('get file' + req.params.fileid + 'for course' + req.params.id);
});
router.put('/:id/file/:fileid', function (req, res, next) {
    res.send('put file' + req.params.fileid + 'for course' + req.params.id);
});
router.delete('/:id/file/:fileid', function (req, res, next) {
    res.send('delete file ' + req.params.fileid + 'for course' + req.params.id);
});

router.get('/:id/video', function (req, res, next) {
    res.send('get videos for course' + req.params.id);
});
router.post('/:id/video', function (req, res, next) {
    res.send('post video for course' + req.params.id);
});

router.get('/:id/video/:videoid', function (req, res, next) {
    res.send('get video' + req.params.videoid + 'for course' + req.params.id);
});
router.put('/:id/video/:videoid', function (req, res, next) {
    res.send('put video' + req.params.videoid + 'for course' + req.params.id);
});
router.delete('/:id/video/:videoid', function (req, res, next) {
    res.send('delete video' + req.params.videoid + 'for course' + req.params.id);
});

router.get('/:id/comment', function (req, res, next) {
    res.send('get comments for course' + req.params.id);
});
router.post('/:id/comment', function (req, res, next) {
    res.send('post comment for course' + req.params.id);
});

router.get('/:id/comment/:commentid', function (req, res, next) {
    res.send('get comment' + req.params.commentid + 'for course' + req.params.id);
});
router.put('/:id/comment/:commentid', function (req, res, next) {
    res.send('put comment' + req.params.commentid + 'for course' + req.params.id);
});
router.delete('/:id/comment/:commentid', function (req, res, next) {
    res.send('delete comment' + req.params.commentid + 'for course' + req.params.id);
});

router.get('/:id/rate', function (req, res, next) {
    res.send('get rates for course' + req.params.id);
});
router.post('/:id/rate', function (req, res, next) {
    res.send('post rate for course' + req.params.id);
});

router.get('/:id/rate/:rateid', function (req, res, next) {
    res.send('get rate' + req.params.rateid + 'for course' + req.params.id);
});
router.put('/:id/rate/:rateid', function (req, res, next) {
    res.send('put rate' + req.params.rateid + 'for course' + req.params.id);
});
router.delete('/:id/rate/:rateid', function (req, res, next) {
    res.send('delete rate' + req.params.rateid + 'for course' + req.params.id);
});

module.exports = router;
