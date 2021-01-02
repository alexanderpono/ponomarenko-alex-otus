import express from 'express';
import { Application } from 'express';
import { MiddleWare } from 'src/middleware/middleware.types';
import { Controller, RouteController } from 'src/controller/types';

interface AppInit {
    port: number;
    middleWares: MiddleWare[];
    routes: Controller[];
}

export class App {
    public app: Application;
    public port: number;

    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.initRoutes(appInit.routes);
    }

    private middlewares(middleWares: {
        forEach: (arg0: (middleWare: MiddleWare) => void) => void;
    }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private initRoutes(controllers: Controller[]) {
        controllers.forEach((rawController: Controller) => {
            const controller = rawController as RouteController;
            const constructor = controller.constructor;

            // console.log('initRoutes() constructor.routes=', constructor.routes);
            // console.log('initRoutes() controller=', controller);
            const routes = Array.isArray(constructor.routes) ? constructor.routes : [];
            const router = express.Router();
            routes.forEach((route) => {
                router[route.method](route.path, route.handler);
            });

            this.app.use(controller.path, router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
