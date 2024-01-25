var express = require('express');
var router = express.Router();
const File = require('../service/mongoose').File;
const { Privileges } = require('../constants');
const db = require('../service/db');

router.get('/', db.checkAuth, db.hasOneOfPriv([Privileges.filesAdmin]), function (req, res, next) {
    File.find({})
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

module.exports = router;
