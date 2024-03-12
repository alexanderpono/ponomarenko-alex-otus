import { SchemaTypes, Schema, model } from 'mongoose';

interface IUser {
    _id: typeof SchemaTypes.ObjectId;
    name: string;
    login: string;
    pass?: string;
    privileges: string[];
}
export const User = model(
    'user',
    new Schema<IUser>({
        _id: { type: SchemaTypes.ObjectId },
        name: { type: String, required: true },
        login: { type: String, required: true },
        pass: { type: String, required: true },
        privileges: { type: [String], required: true }
    })
);
