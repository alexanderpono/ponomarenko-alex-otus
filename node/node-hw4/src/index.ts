console.log('index.ts!');

import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import 'reflect-metadata';

const app = createExpressServer({
    controllers: [UserController]
});

app.listen(3000);
