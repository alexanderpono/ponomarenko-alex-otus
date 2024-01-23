var path = require('path');

const fileStorageDir = path.join(__dirname, './temp/filestorage');
const ERR = {
    NO_PRIV: { error: 'not enough privileges' },
    SERVER_ERR: { error: 'Server error' }
};

module.exports = {
    fileStorageDir,
    ERR
};
