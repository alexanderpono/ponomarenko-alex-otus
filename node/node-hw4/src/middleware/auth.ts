import { Request, Response } from 'express';
import { MiddleWare } from './middleware.types';

export const auth: MiddleWare = (req: Request, resp: Response, next) => {
    if (req.header('Authorization') !== 'Basic dXNlcjpwYXNzd29yZA==') {
        console.log('auth middleware: Access Denied');
        resp.header('WWW-Authenticate', 'Basic');
        resp.sendStatus(401);
    } else {
        next();
    }
};
