var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const Course = require('../service/mongoose').Course;
const db = require('../service/db');
const PETER_ID = require('../api-tests/constants').PETER_ID;
const MATH_ID = require('../api-tests/constants').MATH_ID;

router.post('/', async function (req, res, next) {
    await User.deleteMany({});
    const user = new User({
        _id: db.toObjectId(PETER_ID),
        name: 'Peter',
        login: 'peter',
        pass: 'p'
    });
    await user.save();

    const nick = new User({
        _id: db.toObjectId(db.to24Str('02')),
        name: 'nick',
        login: 'nick',
        pass: 'p'
    });
    await nick.save();

    await Course.deleteMany({});
    const course = new Course({
        description: 'Math',
        author_id: user._id,
        difficulty: 3,
        _id: db.toObjectId(MATH_ID)
    });
    await course.save();

    res.send({ result: 'post reset' });
});

module.exports = router;
