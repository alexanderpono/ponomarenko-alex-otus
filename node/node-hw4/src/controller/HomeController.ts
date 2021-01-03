import { RouteController } from '../decorator/classes';
import { get, logPostBody, post } from '../decorator/methods';

@RouteController('/')
export class HomeController {
    @get('/')
    index() {
        return [
            {
                id: 1,
                name: 'Ali'
            },
            {
                id: 2,
                name: 'Can'
            },
            {
                id: 3,
                name: 'Ahmet'
            }
        ];
    }

    @get('/get')
    get() {
        return [
            {
                id: 1,
                name: 'Ali'
            },
            {
                id: 2,
                name: 'Can'
            },
            {
                id: 3,
                name: 'Ahmet'
            }
        ];
    }

    @logPostBody('home-post')
    @post('/post')
    post() {
        return { postCode: true };
    }
}
