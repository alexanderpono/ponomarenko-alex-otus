const supertest = require('supertest');
const { url } = require('../config');

class AdminFilesApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/files`)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    AdminFilesApi
};
