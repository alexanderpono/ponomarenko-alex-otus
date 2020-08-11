import { Model, AppModel, User, Course } from './models';

describe('Model:getUsers()', () => {
    it('returnes promise with users list', async () => {
        const model = new Model();
        const startData: AppModel = {
            users: [{ name: 'Kate' }],
            courses: []
        };
        model.setStartData(startData);

        const receivedUsers = await model.getUsers();

        expect(receivedUsers).toEqual(startData.users);
    });
});

describe('Model:addUser()', () => {
    it('adds user to users list', () => {
        const model = new Model();
        const Kate: User = { name: 'Kate' };
        const Peter: User = { name: 'Peter' };

        const startData: AppModel = {
            users: [{ name: 'Kate' }],
            courses: []
        };
        const expectedData: AppModel = {
            users: [Kate, Peter],
            courses: []
        };
        model.setStartData(startData);
        model.addUser(Peter).then(function resolved() {
            expect(model.getUsers()).resolves.toEqual(expectedData);
        });
    });
});

describe('Model:getCourses()', () => {
    it('returnes promise with courses list', async () => {
        const model = new Model();
        const startData: AppModel = {
            users: [],
            courses: [
                { id: 'c1', caption: 'Mathematics' },
                { id: 'c2', caption: 'Physics' }
            ]
        };
        model.setStartData(startData);

        const receivedCourses = await model.getCourses();

        expect(receivedCourses).toEqual(startData.courses);
    });
});

describe('Model:addCourse()', () => {
    it('adds course to courses list', async () => {
        const model = new Model();
        const math: Course = { id: 'c1', caption: 'Math' };
        const phys: Course = { id: 'c2', caption: 'Phys' };

        const startData: AppModel = {
            users: [],
            courses: [math]
        };
        const expectedData: AppModel = {
            users: [],
            courses: [math, phys]
        };
        model.setStartData(startData);

        await model.addCourse(phys);
        const receivedCourses = await model.getCourses();

        expect(receivedCourses).toEqual(expectedData.courses);
    });
});
