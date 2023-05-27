import { User, Course, ITestData } from 'src/interfaces';

export class TestStorage {
    testStorage: ITestData;

    constructor() {
        this.testStorage = {
            users: [],
            courses: []
        };
    }

    setStartData(data: ITestData): void {
        this.testStorage = data;
    }

    getUsers(): Promise<void | User[]> {
        return Promise.resolve(this.testStorage.users);
    }

    addUser(user: User): Promise<void> {
        this.testStorage.users.push(user);
        return Promise.resolve();
    }

    getCourses(): Promise<void | Course[]> {
        return Promise.resolve(this.testStorage.courses);
    }

    addCourse(course: Course): Promise<Course> {
        this.testStorage.courses.push(course);
        return Promise.resolve(course);
    }
}
