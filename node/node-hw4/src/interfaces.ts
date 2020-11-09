export interface User {
    name: string;
}

export interface Course {
    id: string;
    caption: string;
}

export interface ITestData {
    users: User[];
    courses: Course[];
}

export class TestData implements ITestData {
    users: User[] = [];
    courses: Course[] = [];

    // constructor() {
    //     this.users = [];
    //     this.courses = [];
    // }
}
