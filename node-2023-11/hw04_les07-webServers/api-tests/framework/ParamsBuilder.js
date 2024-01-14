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

    addName(name) {
        this.name = name;
        return this;
    }

    addLogin(login) {
        this.login = login;
        return this;
    }

    addPass(pass) {
        this.pass = pass;
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
        // console.log('generate() data=', data);
        return data;
    }
}

module.exports = {
    ParamsBuilder
};
