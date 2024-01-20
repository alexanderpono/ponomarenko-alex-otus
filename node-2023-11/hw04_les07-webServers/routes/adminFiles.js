var express = require('express');
var router = express.Router();
const File = require('../service/mongoose').File;

router.get('/', function (req, res, next) {
    File.find({})
        .then((files) => {
            res.send(files);
        })
        .catch((err) => {
            res.status(500).send({ error: 'Server error' });
        });
});

module.exports = router;
