const mongoose = require('mongoose');
const passport = require('passport');
const { ERR } = require('../constants');

mongoose.connect('mongodb://localhost/courses');

const db = mongoose.connection;

db.on('error', (err) => console.error('err.message'));
db.once('open', () => console.info('Connected to MongoDB!'));

const to24Str = (hexNum) => {
    const zeros = new Array(24 - hexNum.length).fill('0').join('');
    return `${zeros}${hexNum}`;
};
const toObjectId = (str24) => {
    return new mongoose.Types.ObjectId(str24);
};
const checkAuth = passport.authenticate('basic', { session: false });

const hasOneOfPriv = (privileges) => {
    return function (req, res, next) {
        const privIndex = privileges.findIndex((priv) => req.user.privileges.indexOf(priv) >= 0);
        const accessGranted = privIndex >= 0;

        if (accessGranted) {
            next();
        } else {
            res.status(403).send(ERR.NO_PRIV);
        }
    };
};

export default {
    toObjectId,
    to24Str,
    getNewObjectId: () => new mongoose.Types.ObjectId(),
    checkAuth,
    hasOneOfPriv
};
