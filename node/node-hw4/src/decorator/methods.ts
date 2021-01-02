import { RouteConfiguration } from '../controller/types';

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
                handler: (req, res) => {
                    res.json(descriptor.value());
                }
            };

            constructor['routes'].push(config);
            return descriptor;
        };
    };
}

export const get = getDecoratorFor('get');
export const post = getDecoratorFor('post');
