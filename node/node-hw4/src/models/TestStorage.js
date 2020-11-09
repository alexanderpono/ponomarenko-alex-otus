"use strict";
exports.__esModule = true;
exports.TestStorage = void 0;
var TestStorage = /** @class */ (function () {
    function TestStorage() {
        this.testStorage = {
            users: [],
            courses: []
        };
    }
    TestStorage.prototype.setStartData = function (data) {
        this.testStorage = data;
    };
    TestStorage.prototype.getUsers = function () {
        return Promise.resolve(this.testStorage.users);
    };
    TestStorage.prototype.addUser = function (user) {
        this.testStorage.users.push(user);
        return Promise.resolve();
    };
    TestStorage.prototype.getCourses = function () {
        return Promise.resolve(this.testStorage.courses);
    };
    TestStorage.prototype.addCourse = function (course) {
        this.testStorage.courses.push(course);
        return Promise.resolve(course);
    };
    return TestStorage;
}());
exports.TestStorage = TestStorage;
