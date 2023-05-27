import { Request, Response } from 'express';

export type MiddleWare = (req: Request, resp: Response, next) => void;
