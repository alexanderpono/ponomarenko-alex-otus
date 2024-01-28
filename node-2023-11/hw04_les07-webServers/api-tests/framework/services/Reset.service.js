const supertest = require('supertest');
const { url } = require('../config');

class ResetApi {
    async reset() {
        const r = await supertest(`${url.localCoursesApi}`)
            .post(`/api/reset`)
            .set('Accept', 'application/json');

        return r;
    }
}

module.exports = {
    ResetApi
};
