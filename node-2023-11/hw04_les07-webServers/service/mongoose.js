const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses');

const db = mongoose.connection;

db.on('error', err => console.error('err.message'));
db.once('open', () => console.info("Connected to MongoDB!"));


const Schema = mongoose.Schema;

const Person = mongoose.model('user', new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true},
    pass: {type: String, required: true}
}));

module.exports = {
    Person: Person
};
