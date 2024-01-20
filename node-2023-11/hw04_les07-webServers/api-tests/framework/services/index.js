const { UsersApi } = require('./Users.service');
const { ResetApi } = require('./Reset.service');
const { CourseApi } = require('./Courses.service');
const { AdminUsersApi } = require('./AdminUsers.service');

const apiProvider = () => ({
    users: () => new UsersApi(),
    adminUsers: () => new AdminUsersApi(),
    courses: () => new CourseApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
