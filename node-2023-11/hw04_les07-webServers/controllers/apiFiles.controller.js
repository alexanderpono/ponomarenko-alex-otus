var express = require('express');
var router = express.Router();
const File = require('../models/File').File;
const fileStorageDir = require('../constants').fileStorageDir;
var path = require('path');
const db = require('../services/db.service');
const fs = require('fs');
const { ERR, Privileges } = require('../constants');
const { object, string, number, date, array, mixed } = require('yup');

function getById(req, res, next) {
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
}

const MAX_FILE_SIZE = 2 * 1000 * 1000;
const postFileSchema = object({
    files: object({
        file: object()
            .shape({
                name: string().required('files.file is a required field'),
                size: number().max(
                    MAX_FILE_SIZE,
                    `Too large file. Max supported file size=${MAX_FILE_SIZE} bytes`
                )
            })
            .required()
    })
});

function post(req, res, next) {
    postFileSchema
        .validate(req)
        .then(() => {
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
        })
        .catch((err) => {
            if (Array.isArray(err.errors)) {
                res.status(400).send(ERR.VALIDATE_ERR(err.errors));
            } else {
                console.log('validate err=', err);
                res.status(500).send(ERR.SERVER_ERR);
            }
        });
}

module.exports = {
    getById,
    post
};
