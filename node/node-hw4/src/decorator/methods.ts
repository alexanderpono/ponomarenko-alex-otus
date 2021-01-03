import { RouteConfiguration } from '../controller/types';
import { Request, Response } from 'express';

interface DecoratedFunction {
    constructor: { name: string };
}

function getDecoratorFor(httpMethod: string) {
    return function (route: string) {
        return function (
            target: DecoratedFunction,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            console.log(target, propertyKey, descriptor);

            const constructor = target.constructor;
            if (!Array.isArray(constructor['routes'])) {
                constructor['routes'] = [];
            }
            const config: RouteConfiguration = {
                method: httpMethod,
                path: route,
                handler: (req: Request, res: Response) => {
                    res.json(descriptor.value(req, res));
                }
            };

            constructor['routes'].push(config);
            return descriptor;
        };
    };
}

export const get = getDecoratorFor('get');
export const post = getDecoratorFor('post');

export function logPostBody(category: string) {
    return function (
        target: DecoratedFunction,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function loggerWrapper(...args) {
            const date = new Date(Date.now());
            const dateS = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            console.log(dateS, 'Log event in', category, 'body', args[0].body);
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
