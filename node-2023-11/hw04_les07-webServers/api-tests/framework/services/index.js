const { UserApi } = require('./User.service');
const { ResetApi } = require('./Reset.service');

const apiProvider = () => ({
    users: () => new UserApi(),
    reset: () => new ResetApi()
});

module.exports = {
    apiProvider
};
