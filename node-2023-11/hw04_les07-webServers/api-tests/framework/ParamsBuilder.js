const { user } = require('./config');

class ParamsBuilder {
    addUser(user) {
        this.user = user;
        return this;
    }

    addUsualUser() {
        this.addUser(user.localCoursesApi.usualUser);
        return this;
    }

    generate() {
        const fields = Object.getOwnPropertyNames(this);
        const data = {};
        fields.forEach((fieldName) => {
            if (this[fieldName] && typeof this[fieldName] !== 'function') {
                data[fieldName] = this[fieldName];
            }
        });
        return data;
    }
}

module.exports = {
    ParamsBuilder
};
