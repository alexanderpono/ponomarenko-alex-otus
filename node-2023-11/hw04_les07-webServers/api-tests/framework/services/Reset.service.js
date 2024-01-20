const supertest = require('supertest');
const { url } = require('../config');

class ResetApi {
    async reset(params) {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/reset`)
            .set('Accept', 'application/json')
            .set('X-User-Name', params.user);

        return r;
    }
}

module.exports = {
    ResetApi
};
