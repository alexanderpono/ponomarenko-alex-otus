export interface User {
    name: string;
}

export interface Course {
    id: string;
    caption: string;
}

export interface AppModel {
    users: User[];
    courses: Course[];
}

export class Model implements AppModel {
    users: User[];
    courses: Course[];

    constructor() {
        this.users = [];
        this.courses = [];
    }

    setStartData(data: AppModel): void {
        this.users = data.users;
        this.courses = data.courses;
    }

    getUsers(): Promise<User[]> {
        return Promise.resolve(this.users);
    }

    addUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

    getCourses(): Promise<Course[]> {
        return Promise.resolve(this.courses);
    }

    addCourse(course: Course): Promise<void> {
        this.courses.push(course);
        return Promise.resolve();
    }
}
