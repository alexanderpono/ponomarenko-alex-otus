var path = require('path');

const fileStorageDir = path.join(__dirname, './temp/filestorage');
const ERR = {
    NO_PRIV: { error: 'not enough privileges' },
    SERVER_ERR: { error: 'Server error' },
    VALIDATE_ERR: (data) => ({ error: 'Validate error', data })
};
const Privileges = {
    users: 'users',
    usersAdmin: 'users.admin',
    filesAdmin: 'files.admin',
    courses: 'courses',
    files: 'files'
};
const ENV = {
    REST_PORT: '3000',
    WS_PORT: '3100'
};

module.exports = {
    fileStorageDir,
    ERR,
    Privileges,
    ENV
};
