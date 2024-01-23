const supertest = require('supertest');
const { url, user } = require('../config');

class AdminUsersApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users`)
            .set('Authorization', user.localCoursesApi.creds.adminRole)
            .set('Accept', 'application/json');
        return r;
    }
    async getNoCreds() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users`)
            .set('Accept', 'application/json');
        return r;
    }
    async getUserNotFound() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users`)
            .set('Authorization', user.localCoursesApi.creds.userNotFound)
            .set('Accept', 'application/json');
        return r;
    }
    async getWrongPassword() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users`)
            .set('Authorization', user.localCoursesApi.creds.wrongPassword)
            .set('Accept', 'application/json');
        return r;
    }
    async getNoPrivileges() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .set('Accept', 'application/json');
        return r;
    }
    async post(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/admin/users`)
            .set('Accept', 'application/json')
            .send(params);
        return r;
    }
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/users/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
    async put(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .put(`/admin/users/${params.id}`)
            .set('Accept', 'application/json')
            .send(params.params);
        return r;
    }
    async delete(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .delete(`/admin/users/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    AdminUsersApi
};
