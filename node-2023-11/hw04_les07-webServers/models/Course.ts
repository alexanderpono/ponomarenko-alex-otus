import { SchemaTypes, Schema, model, Types } from 'mongoose';

interface ICourse {
    _id: typeof SchemaTypes.ObjectId;
    description: string;
    author_id: typeof Types.ObjectId;
    difficulty: number;
    lessons: string[];
}

const LessonSchema = new Schema({
    description: { type: String, required: true }
});

export const Course = model<ICourse>(
    'course',
    new Schema({
        _id: { type: SchemaTypes.ObjectId },
        description: { type: String, required: true },
        author_id: { type: Types.ObjectId, required: true },
        difficulty: { type: Number, required: true },
        lessons: [LessonSchema]
    })
);
