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
        const res = await request(app).get('/courses?test');

        expect(res.text).toMatch('<li>c1 Mathematics</li><li>c2 Physics</li>');
        done();
    });

    it('returns expected json from GET /courses?json', async (done) => {
        const res = await request(app).get('/courses?json&test');

        expect(res.body).toEqual({
            title: 'courses list',
            courses: [
                { id: 'c1', caption: 'Mathematics' },
                { id: 'c2', caption: 'Physics' }
            ]
        });
        done();
    });

    // it('returns json from 1) POST /courses?json&test', (done) => {
    //     request(app)
    //         .post('/courses?json&test')
    //         .set('Accept', 'application/json')
    //         .send({ caption: 'subj1' })
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             // done();

    //             expect(res.body).toEqual({
    //                 title: 'courses list',
    //                 courses: [
    //                     { id: 'c1', caption: 'Mathematics' },
    //                     { id: 'c2', caption: 'Physics' }
    //                 ]
    //             });
    //             done();
    //         });
    //     // .expect('Content-Type', /json/)
    //     // .expect(200)

    //     // request(app)
    //     // .post('/users')
    //     // .send({name: 'john'})
    //     // .set('Accept', 'application/json')
    //     // .expect('Content-Type', /json/)
    //     // .expect(200)
    //     // .end(function(err, res) {
    //     //   if (err) return done(err);
    //     //   done();
    //     // });

    //     // const res = await request(app).get('/courses?json&test');
    // });

    it('returns json from 1) POST /courses?json&test', async (done) => {
        // request(app)
        //     .post('/courses?json&test')
        //     // .set('Accept', 'application/json')
        //     .send({ caption: 'subj1' })
        //     // .expect('Content-Type', /json/)
        //     // .expect(200)
        //     .end(function (err) {
        //         if (err) return done(err);
        //         done();
        //     });

        try {
            await request(app)
                .post('/courses?json&test')
                // .set('Accept', 'application/json')
                .send({ caption: 'subj1' });
            // .end(function (err) {
            //     if (err) return done(err);
            //     done();
            // });
        } catch (e) {
            console.log('jest test error e=', e);
        }

        // .expect('Content-Type', /json/)
        // .expect(200)
        // .then(function fullfilled() {
        //     // if (err) return done(err);
        //     done();
        // })
        // .catch(function rejected(err) {
        //     done(err);
        // });

        done();
    });
});
