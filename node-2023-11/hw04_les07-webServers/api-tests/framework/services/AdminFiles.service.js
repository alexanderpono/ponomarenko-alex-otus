const supertest = require('supertest');
const { url, user } = require('../config');

class AdminFilesApi {
    async get() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/files`)
            .set('Authorization', user.localCoursesApi.creds.adminRole)
            .set('Accept', 'application/json');
        return r;
    }
    async getNoPrivileges() {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/admin/files`)
            .set('Authorization', user.localCoursesApi.creds.userRole)
            .set('Accept', 'application/json');
        return r;
    }
}

module.exports = {
    AdminFilesApi
};
