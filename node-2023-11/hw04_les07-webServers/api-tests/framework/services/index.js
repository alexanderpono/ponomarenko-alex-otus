const { UsersApi } = require('./Users.service');
const { ResetApi } = require('./Reset.service');
const { CourseApi } = require('./Course.service');

const apiProvider = () => ({
    users: () => new UsersApi(),
    courses: () => new CourseApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
