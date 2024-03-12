var express = require('express');
var router = express.Router();
import db from '../services/db.service';
const { Privileges } = require('../constants');
const apiUsersController = require('../controllers/apiUsers.controller');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.users]), apiUsersController.get);
router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.users]), apiUsersController.getById);

module.exports = router;
