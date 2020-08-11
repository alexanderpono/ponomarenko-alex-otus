"use strict";
exports.__esModule = true;
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model() {
        this.users = [];
        this.courses = [];
    }
    Model.prototype.setStartData = function (data) {
        this.users = data.users;
        this.courses = data.courses;
    };
    Model.prototype.getUsers = function () {
        return Promise.resolve(this.users);
    };
    Model.prototype.addUser = function (user) {
        this.users.push(user);
        return Promise.resolve();
    };
    Model.prototype.getCourses = function () {
        return Promise.resolve(this.courses);
    };
    Model.prototype.addCourse = function (course) {
        this.courses.push(course);
        return Promise.resolve();
    };
    return Model;
}());
exports.Model = Model;
