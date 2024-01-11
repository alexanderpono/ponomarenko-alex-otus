const supertest = require('supertest');
const { url } = require('../config');

class UserApi {
    async get(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .get(`/api/user`)
            .set('Accept', 'application/json')
            .set('X-User-Name', params.user);

        return r;
    }
}

module.exports = {
    UserApi
};
