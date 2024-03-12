import { SchemaTypes, Schema, model } from 'mongoose';

interface IFile {
    _id: typeof SchemaTypes.ObjectId;
    name: string;
    size: number;
    type: string;
    privileges: string[];
}
export const File = model<IFile>(
    'file',
    new Schema({
        _id: { type: SchemaTypes.ObjectId },
        name: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true }
    })
);
