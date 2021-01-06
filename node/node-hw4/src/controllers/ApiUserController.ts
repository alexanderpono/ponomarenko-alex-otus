import { Param, Body, Get, Post, Put, Delete, JsonController, Res } from 'routing-controllers';
import { call, put, runSaga } from '../lib/saga';
import { User } from 'src/models/User';
import { getAllSaga, getOneSaga, postSaga, putSaga, deleteSaga } from './ApiUserController.saga';

interface Response {
    status: (n: number) => void;
    json: (n: Record<string, unknown>) => void;
}

@JsonController('/api/users')
export class ApiUserController {
    @Get('/')
    async getAll(@Res() res: Response) {
        return runSaga(getAllSaga, res, call, put);
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
        return runSaga(getOneSaga, res, id, call, put);
    }

    @Post('/')
    async post(@Body() input: User, @Res() res: Response) {
        return runSaga(postSaga, res, input, call, put);
    }

    @Put('/:id')
    async put(@Param('id') id: number, @Body() input, @Res() res: Response) {
        return runSaga(putSaga, res, id, input, call, put);
    }

    @Delete('/:id')
    async remove(@Param('id') id: number, @Res() res: Response) {
        return runSaga(deleteSaga, res, id, call, put);
    }
}
