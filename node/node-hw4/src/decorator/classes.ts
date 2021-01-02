type Constructor = { new (...args) };

export function RouteController(path: string) {
    return function <T extends Constructor>(construct: T): T {
        return class extends construct {
            public path = path;
        };
    };
}
