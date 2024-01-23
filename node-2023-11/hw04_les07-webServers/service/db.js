const mongoose = require('mongoose');

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
module.exports = {
    toObjectId,
    to24Str,
    getNewObjectId: () => new mongoose.Types.ObjectId(),
    isAdmin
};
