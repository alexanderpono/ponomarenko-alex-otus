import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class HomeController extends BaseController {
    public path = '/';

    constructor() {
        super();
        this.initRoutes();
    }

    public routes = [
        {
            method: 'get',
            path: '/simple',
            handler: (req, res) => this.index(req, res)
        }
    ];

    public initRoutes(): void {
        this.router.get('/', this.index);
    }

    index = (req: Request, res: Response): void => {
        const users = [
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

        res.json({ users });
    };
}
