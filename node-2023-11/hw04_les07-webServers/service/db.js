const mongoose = require('mongoose');
const passport = require('passport');
const { ERR } = require('../constants');

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

module.exports = {
    toObjectId,
    to24Str,
    getNewObjectId: () => new mongoose.Types.ObjectId(),
    checkAuth,
    hasOneOfPriv
};
