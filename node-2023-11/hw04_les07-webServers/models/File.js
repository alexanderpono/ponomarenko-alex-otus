const mongoose = require('mongoose');

const File = mongoose.model(
    'file',
    new mongoose.Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        name: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true }
    })
);
module.exports = {
    File
};
