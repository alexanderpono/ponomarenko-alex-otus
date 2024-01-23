var express = require('express');
var router = express.Router();
const File = require('../service/mongoose').File;
const { NO_PRIV } = require('../constants');
const db = require('../service/db');

router.get('/', db.checkAuth, function (req, res, next) {
    if (!db.isAdmin(req.user)) {
        res.status(403).send(NO_PRIV);
        return;
    }
    File.find({})
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

module.exports = router;
