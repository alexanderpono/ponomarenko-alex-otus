const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    description: { type: String, required: true }
});

const Course = mongoose.model(
    'course',
    new mongoose.Schema({
        _id: { type: mongoose.SchemaTypes.ObjectId },
        description: { type: String, required: true },
        author_id: { type: mongoose.Types.ObjectId, required: true },
        difficulty: { type: Number, required: true },
        lessons: [LessonSchema]
    })
);

module.exports = {
    Course
};
