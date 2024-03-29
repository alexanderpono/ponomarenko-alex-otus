const supertest = require('supertest');
const { url, user } = require('../config');
const path = require('path');

class FilesApi {
    async getById(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/files/${id}`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .set('Accept', 'application/json');
        return r;
    }

    async getByIdNoCreds(id) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/files/${id}`)
            .set('Accept', 'application/json');
        return r;
    }

    async post(fileName) {
        const fName = path.join(__dirname, '../../http', fileName);
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/files`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .attach('file', fName);
        return r;
    }

    async postNoCreds(fileName) {
        const fName = path.join(__dirname, '../../http', fileName);
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/files`)
            .attach('file', fName);
        return r;
    }
}

module.exports = {
    FilesApi
};
