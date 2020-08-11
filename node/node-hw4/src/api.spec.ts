const app = require('../app');
const request = require('supertest');

describe('api', () => {
    it('returns <h1>my-courses</h1><p>Welcome to my-courses</p> from GET /', async (done) => {
        const res = await request(app).get('/');

        expect(res.text).toMatch('<h1>my-courses</h1><p>Welcome to my-courses</p>');
        done();
    });

    it('returns <h1>courses list</h1> from GET /courses', async (done) => {
        const res = await request(app).get('/courses');

        expect(res.text).toMatch('<h1>courses list</h1>');
        done();
    });

    it('returns <li>c1 Mathematics</li><li>c2 Physics</li> from GET /courses', async (done) => {
        const res = await request(app).get('/courses');

        expect(res.text).toMatch('<li>c1 Mathematics</li><li>c2 Physics</li>');
        done();
    });

    it('returns expected json from GET /courses?json', async (done) => {
        const res = await request(app).get('/courses?json');

        expect(res.body).toEqual({
            title: 'courses list',
            courses: [
                { id: 'c1', caption: 'Mathematics' },
                { id: 'c2', caption: 'Physics' }
            ]
        });
        done();
    });
});
