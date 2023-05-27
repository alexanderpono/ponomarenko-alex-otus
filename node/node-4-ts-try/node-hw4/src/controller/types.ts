import * as express from 'express';

export interface RouteConfiguration {
    method: string;
    path: string;
    handler: (req: express.Request, res: express.Response) => void;
}

export interface Controller {}

export interface RouteController {
    path: string;
    constructor: {
        routes: RouteConfiguration[];
    };
}
