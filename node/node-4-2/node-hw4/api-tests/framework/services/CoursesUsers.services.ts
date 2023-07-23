import supertest from 'supertest';
import { urls } from '../config';

export interface Params {
    apiUserName: string;
    token: string;
    id?: number;
    name?: string;
    role?: string;
}

export class CoursesUsers {
    async get(params: Params) {
        const r = await supertest(`${urls.localCourses}`)
            .get(`/api/users`)
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${params.token}`)
            .set('X-User-Name', params.apiUserName);

        return r;
    }

    async getById(params: Params) {
        const r = await supertest(`${urls.localCourses}`)
            .get(`/api/users/${params.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${params.token}`)
            .set('X-User-Name', params.apiUserName);

        return r;
    }

    async post(params: Params) {
        const r = await supertest(`${urls.localCourses}`)
            .post(`/api/users`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${params.token}`)
            .set('X-User-Name', params.apiUserName)
            .send({ name: params.name, role: params.role });

        return r;
    }

    async put(params: Params) {
        const r = await supertest(`${urls.localCourses}`)
            .put(`/api/users/${params.id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${params.token}`)
            .set('X-User-Name', params.apiUserName)
            .send({ id: params.id, name: params.name, role: params.role });

        return r;
    }

    async delete(params: Params) {
        const r = await supertest(`${urls.localCourses}`)
            .delete(`/api/users/${params.id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Basic ${params.token}`)
            .set('X-User-Name', params.apiUserName);

        return r;
    }
}
