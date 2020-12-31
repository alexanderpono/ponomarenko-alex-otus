import express from 'express';
import { Application } from 'express';
import { MiddleWare } from 'src/middleware/middleware.types';
import { BaseController } from 'src/controller/BaseController';

interface AppInit {
    port: number;
    middleWares: MiddleWare[];
    routes: BaseController[];
}

export class App {
    public app: Application;
    public port: number;

    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.routes);
    }

    private middlewares(middleWares: {
        forEach: (arg0: (middleWare: MiddleWare) => void) => void;
    }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: BaseController) => void) => void }) {
        controllers.forEach((controller) => {
            controller.initRoutes();
            this.app.use(controller.path, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
