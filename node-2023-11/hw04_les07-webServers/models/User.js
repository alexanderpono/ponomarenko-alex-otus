const mongoose = require('mongoose');

const User = mongoose.model(
    'user',
    new mongoose.Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        name: { type: String, required: true },
        login: { type: String, required: true },
        pass: { type: String, required: true },
        privileges: { type: [String], required: true }
    })
);
module.exports = {
    User
};
