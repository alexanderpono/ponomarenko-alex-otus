var express = require('express');
var router = express.Router();
const User = require('../service/mongoose').User;
const Course = require('../service/mongoose').Course;

router.post('/', async function (req, res, next) {
    await User.deleteMany({});

    const user = new User({
        name: 'Peter',
        login: 'peter',
        pass: 'p'
    });
    await user.save();
    console.log('reset() user=', user);

    await Course.deleteMany({});
    const course = new Course({ description: 'Math', author_id: user._id, difficulty: 3 });
    await course.save();

    res.send({ result: 'post reset' });
});

module.exports = router;
