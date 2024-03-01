var express = require('express');
var router = express.Router();
const User = require('../models/User').User;
const Course = require('../models/Course').Course;
const File = require('../models/File').File;
import db from '../services/db.service';
const PETER_ID = require('../api-tests/constants').PETER_ID;
const MATH_ID = require('../api-tests/constants').MATH_ID;
const HISTORY_ID = require('../api-tests/constants').HISTORY_ID;
const FILE_ID = require('../api-tests/constants').FILE_ID;
var FileStorageService = require('../services/FileStorageService').FileStorageService;
const fileStorageDir = require('../constants').fileStorageDir;
var path = require('path');
const fs = require('fs');
const { DELME_ID, NICK_ID, TOM_ID } = require('../api-tests/constants');
const { Privileges } = require('../constants');

async function post(req, res, next) {
    await User.deleteMany({});
    const user = new User({
        _id: db.toObjectId(PETER_ID),
        name: 'Peter',
        login: 'peter',
        pass: 'p',
        privileges: [Privileges.users]
    });
    await user.save();

    const nick = new User({
        _id: db.toObjectId(db.to24Str(NICK_ID)),
        name: 'nick',
        login: 'nick',
        pass: 'p',
        privileges: [Privileges.usersAdmin, Privileges.filesAdmin]
    });
    await nick.save();

    const delme = new User({
        _id: db.toObjectId(db.to24Str(DELME_ID)),
        name: 'delme',
        login: 'delme',
        pass: 'p',
        privileges: []
    });
    await delme.save();

    const tom = new User({
        _id: db.toObjectId(db.to24Str(TOM_ID)),
        name: 'tom',
        login: 'tom',
        pass: 'p',
        privileges: [Privileges.users, Privileges.courses, Privileges.files]
    });
    await tom.save();

    await Course.deleteMany({});
    const math = new Course({
        description: 'Math',
        author_id: user._id,
        difficulty: 3,
        _id: db.toObjectId(MATH_ID),
        lessons: [{ description: '1. Математика - вводный урок' }]
    });
    await math.save();

    const history = new Course({
        description: 'History',
        author_id: user._id,
        difficulty: 3,
        _id: db.toObjectId(HISTORY_ID),
        lessons: [{ description: '1. История - вводный урок' }]
    });
    await history.save();

    const fStorage = new FileStorageService(fileStorageDir);
    fStorage.clearStorageDir();

    await File.deleteMany({});
    const song = new File({
        _id: db.toObjectId(FILE_ID),
        name: '1.png',
        size: 369,
        type: 'picture'
    });
    await song.save();

    const sourceFile = path.join(__dirname, '../api-tests/http/1.png');
    const targetFile = path.join(fileStorageDir, FILE_ID);
    await fs.promises.copyFile(sourceFile, targetFile);

    res.send({ result: 'post reset' });
}

module.exports = {
    post
};
