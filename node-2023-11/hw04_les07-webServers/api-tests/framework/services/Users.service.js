const supertest = require('supertest');
const { url, user } = require('../config');

class UsersApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .set('Accept', 'application/json');
        return r;
    }
    async getNoCreds() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users`)
            .set('Accept', 'application/json');
        return r;
    }
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users/${id}`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .set('Accept', 'application/json');
        return r;
    }
    async getByIdNoCreds(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    UsersApi
};
