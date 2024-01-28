var express = require('express');
var router = express.Router();
const db = require('../services/db.service');
const { Privileges } = require('../constants');
const adminUsersController = require('../controllers/adminUsers.controller');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), adminUsersController.get);
router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.usersAdmin]), adminUsersController.post);

router.get(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    adminUsersController.getById
);

router.put(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    adminUsersController.put
);

router.delete(
    '/:id',
    db.checkAuth,
    db.hasOneOfPriv([Privileges.usersAdmin]),
    adminUsersController.deleteById
);

module.exports = router;
