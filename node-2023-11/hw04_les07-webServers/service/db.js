const mongoose = require('mongoose');
const passport = require('passport');

const to24Str = (hexNum) => {
    const zeros = new Array(24 - hexNum.length).fill('0').join('');
    return `${zeros}${hexNum}`;
};
const toObjectId = (str24) => {
    return new mongoose.Types.ObjectId(str24);
};
const isAdmin = (user) => {
    return user.login === 'nick';
};
const checkAuth = passport.authenticate('basic', { session: false });
module.exports = {
    toObjectId,
    to24Str,
    getNewObjectId: () => new mongoose.Types.ObjectId(),
    isAdmin,
    checkAuth
};
