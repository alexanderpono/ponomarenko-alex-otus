var express = require('express');
var router = express.Router();
const File = require('../service/mongoose').File;
const fileStorageDir = require('../constants').fileStorageDir;
var path = require('path');
const db = require('../service/db');
const fs = require('fs');
const { Privileges } = require('../constants');

router.get('/:id', db.checkAuth, db.hasOneOfPriv([Privileges.files]), function (req, res, next) {
    File.findById(req.params.id)
        .then((file) => {
            if (!file) {
                return res.status(404).send({ error: 'Not found' });
            }

            const filePath = path.join(fileStorageDir, req.params.id);
            res.sendFile(filePath);
        })
        .catch((err) => {
            console.log('findById err=', err);
            res.status(500).send({ error: 'Server error' });
        });
});

router.post('/', db.checkAuth, db.hasOneOfPriv([Privileges.files]), function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let data = req.files.file;

    const hash = db.getNewObjectId().toHexString();

    const song = new File({
        _id: hash,
        name: data.name,
        size: data.size,
        type: data.mimetype
    });
    song.save()
        .then(() => {
            return fs.promises.mkdir(fileStorageDir, { recursive: true });
        })
        .then(() => {
            const targetPath = path.join(fileStorageDir, hash);
            data.mv(targetPath, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(201).send({
                    hash,
                    name: data.name,
                    type: data.mimetype,
                    size: data.size
                });
            });
        })
        .catch((err) => {
            console.log('err=', err);
            return res.status(500).send({ error: 'Server error' });
        });
});

module.exports = router;
