import { Model, User, AppModel } from './models';

export const model = new Model();
const Kate: User = { name: 'Kate' };
const Peter: User = { name: 'Peter' };

const startData: AppModel = {
    users: [Kate, Peter],
    courses: [
        { id: 'c1', caption: 'Mathematics' },
        { id: 'c2', caption: 'Physics' }
    ]
};
model.setStartData(startData);
