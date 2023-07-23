import { RouteConfiguration } from '../controller/types';

type Constructor = { new (...args) };
export interface DetailedConstructor {
    routes: RouteConfiguration[];
}

export function RouteController(path: string) {
    return function <T extends Constructor>(construct: T): T {
        getControllersStorage().push({ constructor: construct, path });
        return class extends construct {
            public path = path;
        };
    };
}

export interface ControllerInfo {
    constructor: Constructor;
    path: string;
}

export function getControllersStorage(): ControllerInfo[] {
    const key = 'controllers';
    if (!global[key]) {
        global[key] = [];
    }

    return global[key];
}
