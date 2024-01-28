var express = require('express');
var router = express.Router();
const db = require('../services/db.service');
const { Privileges } = require('../constants');
const apiUsersController = require('../controllers/apiUsers.controller');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.users]), apiUsersController.get);
router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.users]), apiUsersController.getById);

module.exports = router;
