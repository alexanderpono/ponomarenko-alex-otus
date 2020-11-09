import { User, Course, ITestData } from '../interfaces';
import { TestStorage } from './TestStorage';

describe('TestModel:getUsers()', () => {
    it('returnes promise with users list', async () => {
        const model = new TestStorage();
        const startData: ITestData = {
            users: [{ name: 'Kate' }],
            courses: []
        };
        model.setStartData(startData);

        const receivedUsers = await model.getUsers();

        expect(receivedUsers).toEqual(startData.users);
    });
});

describe('TestModel:addUser()', () => {
    it('adds user to users list', () => {
        const model = new TestStorage();
        const Kate: User = { name: 'Kate' };
        const Peter: User = { name: 'Peter' };

        const startData: ITestData = {
            users: [{ name: 'Kate' }],
            courses: []
        };
        const expectedData: ITestData = {
            users: [Kate, Peter],
            courses: []
        };
        model.setStartData(startData);
        model.addUser(Peter).then(function resolved() {
            expect(model.getUsers()).resolves.toEqual(expectedData.users);
        });
    });
});

describe('TestModel:getCourses()', () => {
    it('returnes promise with courses list', async () => {
        const model = new TestStorage();
        const startData: ITestData = {
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

describe('TestModel:addCourse()', () => {
    it('adds course to courses list', async () => {
        const model = new TestStorage();
        const math: Course = { id: 'c1', caption: 'Math' };
        const phys: Course = { id: 'c2', caption: 'Phys' };

        const startData: ITestData = {
            users: [],
            courses: [math]
        };
        const expectedData: ITestData = {
            users: [],
            courses: [math, phys]
        };
        model.setStartData(startData);

        await model.addCourse(phys);
        const receivedCourses = await model.getCourses();

        expect(receivedCourses).toEqual(expectedData.courses);
    });
});
