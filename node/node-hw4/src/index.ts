console.log('index.ts!');

import { createExpressServer } from 'routing-controllers';
import { ApiUserController } from './controllers/ApiUserController';
import 'reflect-metadata';
import { logger as loggerMiddleware } from './middleware/logger';

const app = createExpressServer({
    controllers: [ApiUserController]
});

app.use(loggerMiddleware);
app.listen(3000);
