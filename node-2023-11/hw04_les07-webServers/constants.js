var path = require('path');

const fileStorageDir = path.join(__dirname, './temp/filestorage');
const ERR = {
    NO_PRIV: { error: 'not enough privileges' },
    SERVER_ERR: { error: 'Server error' }
};
const Privileges = {
    users: 'users',
    usersAdmin: 'users.admin',
    filesAdmin: 'files.admin',
    courses: 'courses',
    files: 'files'
};

module.exports = {
    fileStorageDir,
    ERR,
    Privileges
};
