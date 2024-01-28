var express = require('express');
var router = express.Router();
const { Privileges } = require('../constants');
const db = require('../services/db.service');
const adminFilesController = require('../controllers/adminFiles.controller');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.filesAdmin]), adminFilesController.get);

module.exports = router;
