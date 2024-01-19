const { UsersApi } = require('./Users.service');
const { ResetApi } = require('./Reset.service');
const { CourseApi } = require('./Courses.service');

const apiProvider = () => ({
    users: () => new UsersApi(),
    courses: () => new CourseApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
