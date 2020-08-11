var express = require('express');
var router = express.Router();
const { model } = require('../src/model');

router.get('/', async function (_, res) {
    const courses = await model.getCourses();
    res.render('courses', { title: 'courses list', courses });
});

module.exports = router;
