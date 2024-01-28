const db = require('../services/db.service');

module.exports = {
    PETER_ID: db.to24Str('01'),
    NICK_ID: db.to24Str('02'),
    DELME_ID: db.to24Str('03'),
    TOM_ID: db.to24Str('04'),
    MATH_ID: db.to24Str('0101'),
    HISTORY_ID: db.to24Str('0102'),
    FILE_ID: db.to24Str('0201')
};
