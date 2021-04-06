const port = 3000;
console.log(`index.ts! listening ${3000}`);

import { createExpressServer } from 'routing-controllers';
import { ApiUserController } from './controllers/ApiUserController';
import { ApiAuthController } from './controllers/ApiAuthController';
import 'reflect-metadata';
import { logger as loggerMiddleware } from './middleware/logger';

const app = createExpressServer({
    cors: {},
    controllers: [ApiUserController, ApiAuthController],
    middlewares: [loggerMiddleware]
});

app.use(loggerMiddleware);
app.listen(port);
