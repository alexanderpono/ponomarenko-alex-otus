import { Request, Response } from 'express';
import { MiddleWare } from './middleware.types';

export const logger: MiddleWare = (req: Request, resp: Response, next) => {
    console.log('Simple log: ', req.method, req.path);
    next();
};
