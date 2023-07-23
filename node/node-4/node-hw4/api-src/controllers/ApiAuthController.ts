import { Body, Post, JsonController, Res } from 'routing-controllers';
import { call, put, runSaga } from '../lib/saga';
import { authSaga } from './ApiAuthController.saga';
import { Auth } from '@api-src/models/Auth';

interface Response {
    status: (n: number) => void;
    json: (n: Record<string, unknown>) => void;
}

@JsonController('/api/auth')
export class ApiAuthController {
    @Post('/')
    async post(@Body() input: Auth, @Res() res: Response) {
        return runSaga(authSaga, res, input, call, put);
    }
}
