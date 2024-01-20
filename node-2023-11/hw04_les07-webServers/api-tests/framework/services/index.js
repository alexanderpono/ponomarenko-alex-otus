const { UsersApi } = require('./Users.service');
const { ResetApi } = require('./Reset.service');
const { CourseApi } = require('./Courses.service');
const { AdminUsersApi } = require('./AdminUsers.service');
const { AdminFilesApi } = require('./AdminFiles.service');
const { FilesApi } = require('./Files.service');

const apiProvider = () => ({
    users: () => new UsersApi(),
    files: () => new FilesApi(),
    adminUsers: () => new AdminUsersApi(),
    adminFiles: () => new AdminFilesApi(),
    courses: () => new CourseApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
