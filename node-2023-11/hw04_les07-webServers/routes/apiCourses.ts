var express = require('express');
var router = express.Router();
import db from '../services/db.service';
const { Privileges } = require('../constants');
const apiCoursesController = require('../controllers/apiCourses.controller');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), apiCoursesController.get);
router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), apiCoursesController.post);

router.get(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.courses]),
    apiCoursesController.getById
);

router.put('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.courses]), apiCoursesController.put);

router.delete(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.courses]),
    apiCoursesController.del
);

module.exports = router;
