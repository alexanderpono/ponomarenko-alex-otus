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

    addDescription(description) {
        this.description = description;
        return this;
    }
    addAuthorId(author_id) {
        this.author_id = author_id;
        return this;
    }
    addDifficulty(difficulty) {
        this.difficulty = difficulty;
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
