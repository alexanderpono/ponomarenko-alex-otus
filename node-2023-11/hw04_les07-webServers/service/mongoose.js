const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses');

const db = mongoose.connection;

db.on('error', (err) => console.error('err.message'));
db.once('open', () => console.info('Connected to MongoDB!'));

const Schema = mongoose.Schema;

const User = mongoose.model(
    'user',
    new Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        name: { type: String, required: true },
        login: { type: String, required: true },
        pass: { type: String, required: true }
    })
);
const LessonSchema = new Schema({
    description: { type: String, required: true }
});

const Course = mongoose.model(
    'course',
    new Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        description: { type: String, required: true },
        author_id: { type: mongoose.Types.ObjectId, required: true },
        difficulty: { type: Number, required: true },
        lessons: [LessonSchema]
    })
);

const File = mongoose.model(
    'file',
    new Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        name: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true }
    })
);
module.exports = {
    User,
    Course,
    File
};
