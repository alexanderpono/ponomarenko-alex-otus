const { UserApi } = require('./User.service');
const { ResetApi } = require('./Reset.service');
const { CourseApi } = require('./Course.service');

const apiProvider = () => ({
    users: () => new UserApi(),
    courses: () => new CourseApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
