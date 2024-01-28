var express = require('express');
var router = express.Router();
const db = require('../services/db.service');
const { Privileges } = require('../constants');
const apiFilesController = require('../controllers/apiFiles.controller');

router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.files]), apiFilesController.getById);
router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.files]), apiFilesController.post);

module.exports = router;
