const supertest = require('supertest');
const { url } = require('../config');

class CourseApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/courses`)
            .set('Accept', 'application/json');
        return r;
    }
    async post(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/courses`)
            .set('Accept', 'application/json')
            .send(params);
        return r;
    }
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/courses/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
    async put(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .put(`/api/courses/${params.id}`)
            .set('Accept', 'application/json')
            .send(params.params);
        return r;
    }
    async delete(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .delete(`/api/courses/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    CourseApi
};
