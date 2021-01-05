import { Request, Response } from 'express';
import { MiddleWare } from './middleware.types';

export const logger: MiddleWare = (req: Request, resp: Response, next) => {
    const date = new Date(Date.now());
    const to2 = (n: number) => {
        const s = `${n}`;
        if (s.length === 1) {
            return `0${s}`;
        }
        return s;
    };
    const dateS = `${to2(date.getHours())}:${to2(date.getMinutes())}:${to2(date.getSeconds())}`;
    const body = req.body ? `body=` + JSON.stringify(req.body) : '';
    const query = Object.keys(req.query).length > 0 ? `query=` + JSON.stringify(req.query) : '';
    const params = Object.keys(req.params).length > 0 ? `params=` + JSON.stringify(req.params) : '';
    console.log(`${dateS}: `, req.method, req.path, body, query, params);
    next();
};
