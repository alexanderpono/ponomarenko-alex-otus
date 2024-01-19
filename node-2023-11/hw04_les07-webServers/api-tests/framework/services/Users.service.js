const supertest = require('supertest');
const { url } = require('../config');

class UsersApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users`)
            .set('Accept', 'application/json');
        return r;
    }
    async post(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/users`)
            .set('Accept', 'application/json')
            .send(params);
        return r;
    }
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/users/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
    async put(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .put(`/api/users/${params.id}`)
            .set('Accept', 'application/json')
            .send(params.params);
        return r;
    }
    async delete(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .delete(`/api/users/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    UsersApi
};
