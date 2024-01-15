const supertest = require('supertest');
const { url } = require('../config');

class CourseApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/course`)
            .set('Accept', 'application/json');
        return r;
    }
    async post(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/course`)
            .set('Accept', 'application/json')
            .send(params);
        return r;
    }
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/course/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
    async put(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .put(`/api/course/${params.id}`)
            .set('Accept', 'application/json')
            .send(params.params);
        return r;
    }
    async delete(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .delete(`/api/course/${id}`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    CourseApi
};
