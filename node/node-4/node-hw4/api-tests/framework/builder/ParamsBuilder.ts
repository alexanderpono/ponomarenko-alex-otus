import faker from 'faker';
import { user } from '../config';

function generate() {
    const fields = Object.getOwnPropertyNames(this);
    const data = {};
    fields.forEach((fieldName) => {
        if (this[fieldName] && typeof this[fieldName] !== 'function') {
            data[fieldName] = this[fieldName];
        }
    });
    return data;
}

function addToken(token) {
    this.token = token;
    return this;
}

function addGoodToken() {
    this.addToken(user.localCourses.token);
    return this;
}

function addBadToken() {
    this.addToken('');
    return this;
}

function addUser(userName: string) {
    this.apiUserName = userName;
    return this;
}

function addAdminUser() {
    this.addUser(user.localCourses.adminUser);
    return this;
}

function addUsualUser() {
    this.addUser(user.localCourses.usualUser);
    return this;
}

export const ParamsBuilder = function () {
    this.addToken = addToken;
    this.addGoodToken = addGoodToken;
    this.addBadToken = addBadToken;

    this.addUser = addUser;
    this.addAdminUser = addAdminUser;
    this.addUsualUser = addUsualUser;

    this.addUserId = function (id: number) {
        this.id = id;
        return this;
    };

    this.addCoursesUser = function (userName: string) {
        this.name = userName;
        return this;
    };
    this.addCoursesRndUserName = function () {
        this.addCoursesUser(faker.internet.userName());
        return this;
    };

    this.addCoursesUserRole = function (role: string) {
        this.role = role;
        return this;
    };
    this.addCoursesUserAdminRole = function () {
        this.addCoursesUserRole(user.localCourses.adminRole);
        return this;
    };
    this.addCoursesUserUsualRole = function () {
        this.addCoursesUserRole(user.localCourses.userRole);
        return this;
    };

    this.generate = generate;
};
