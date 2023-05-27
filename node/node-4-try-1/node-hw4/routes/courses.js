var express = require('express');
var router = express.Router();
const { ModelFactory } = require('../src/ModelFactory');

router.get('/', async function (req, res) {
    // console.log('/ req.query=', req.query);
    // console.log('/ req.query.test=', req.query.test);

    const mode = typeof req.query.test !== 'undefined' ? 'test' : '';
    // console.log('mode=', mode);
    const storage = ModelFactory.getModel(mode);
    storage
        .getCourses()
        .then(function resolved(courses) {
            // console.log('courses3=', courses);
            if (typeof req.query.json !== 'undefined') {
                res.json({ title: 'courses list', courses });
            } else {
                // console.log('courses=', courses);
                res.render('courses', { title: 'courses list', courses });
            }
        })
        .catch(function (err) {
            console.log('model2.getCourses() catch err=', err);
        });
});

router.post('/', async function (req, res) {
    // console.log('courses POST Got body:', req.body);
    // console.log('courses POST req.query=', req.query);
    const testParam = typeof req.query.test !== 'undefined' ? 'test' : '';
    // console.log('courses POST testParam=', testParam);
    const mode = typeof req.query.test !== 'undefined' ? 'test' : '';
    const storage = ModelFactory.getModel(mode);

    try {
        const course = await storage.addCourse(req.body, testParam);
        res.status(201);
        res.json(course);
    } catch (e) {
        console.log('/courses POST: only test is supported e=', e);
    }
});

module.exports = router;
