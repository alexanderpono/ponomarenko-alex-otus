var express = require('express');
var router = express.Router();
const { model } = require('../src/model');

router.get('/', async function (req, res) {
    const courses = await model.getCourses();
    if (typeof req.query.json !== 'undefined') {
        res.json({ title: 'courses list', courses });
    } else {
        res.render('courses', { title: 'courses list', courses });
    }
});

module.exports = router;
